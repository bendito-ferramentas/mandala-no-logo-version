<script>
	import { onMount } from 'svelte';
  import * as d3 from "d3"
  import gsap from 'gsap';
  import textures from "textures";
	import { MARKET_COLORS, MANDALA_CONFIG } from '$lib/utils/constants.js';
  import { menu, mandalaLayout, activeItems, data, hoveredItems, addHoveredItem, removeHoveredItem, select, selected, filters } from "$lib/stores";
  import { runSimulationTicks, rad2deg } from "$lib/utils/helpers";
	import { jello } from '$lib/utils/animista';
	import Add from '$lib/icons/Add.svelte';
	import { draw } from 'svelte/transition';

  export let territoryTierNodes // territory tier node
  export let rotation = 0

  const tierTextures = {}

  const forceCollide = d3.forceCollide().radius(computeCollideRadius)

  const simulation = d3.forceSimulation()
    .alphaTarget(0.3) // stay hot
    .velocityDecay(0.25) // low friction
    .force("x", d3.forceX(d => d.x))
    .force("y", d3.forceY(d => d.y))
    .force("collide", forceCollide)
    .on('tick', tick)
    .stop()
  

  let texturesAdded = false

  let group
  let simulationFinished = false


  $: nodes = makeNodes(territoryTierNodes, $data.products, $data.brands)
  $: filteredNodes = filterNodes(nodes, $filters)
  
  $: rotate(rotation)
    
  $: if (group && filteredNodes) {

    if (!texturesAdded) {
      Object.values(tierTextures).forEach(t => d3.select(group).call(t)) 
      texturesAdded = true
    }
    
    forceCollide.radius(computeCollideRadius)
    simulation.nodes(filteredNodes).alpha(1).restart()
    renderItems(filteredNodes)
  }

    


  function computeCollideRadius(d) {
    return d.r + MANDALA_CONFIG.itemsCollisionPad
  }

  function rotate(rad) {
    d3.selectAll('.item.item-brand .inner')
      .attr('transform', `rotate(${rad2deg(-rad)}, .5, .5)`)
  }

  function onMouseEnter(_, d) {
    const inner = d3.select(this).select('.inner').node()
    jello(inner)

    const { x, y, width, height } = this.getBoundingClientRect()

    addHoveredItem(d.data, d.isBrand ? "brand" : "product", x + width/2, y + height/2)
  }


  function onMouseOut() {
    removeHoveredItem()
  }


  function renderItems(nodes) {
    if (!group) return;

    const items = d3.select(group).selectAll(".item")
      .data(nodes, d => d.data.id)

    // Update existing elements
    items
      .style('pointer-events', d => d.active ? 'all' : 'none')
      .style('opacity', d => +d.active)

    // Remove old elements
    items.exit().remove();

    // Enter new elements
    const enter = items.enter().append('g')
      .attr('class', d => `transitionable item ` + (d.isBrand ? `item-brand ` : `item-product br-${d.data.brandId}`) + ` ${d.data.fullId} mt-${d.data.macroId} tr-${d.data.territoryId} tr-${d.data.territoryTierId} ti-${d.data.tierId}`)
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .style('cursor', 'pointer')
      .style('opacity', 0)
      .on('mouseenter', onMouseEnter)
      .on('mouseout', onMouseOut)
      .on('click', (_, d) => select(d.type, d.data.id))

    enter.each(drawItem)

    // Fade in entering nodes
    enter
      .transition(d3.transition().delay(Math.random() * 500).duration(300 + Math.random() * 200).ease(d3.easeQuadOut))
      .style('opacity', d => +d.active)

  }

  function drawItem(d) {
    const { r, fill, opacity } = d
    
    const item = d3.select(this)
    
    addCircle(item, { r, opacity, fill: 'transparent' }) // Trigger

    const inner = item.append('g')
      .attr('class', 'inner')
      .attr('pointer-events', 'none')

    addCircle(inner, { r, fill, opacity })

    if (d.data.isCore) {
      addCircle(inner, { r: r*1.25, fill: 'none', opacity, stroke: fill, strokeWidth: 1.5 })
    }
    else if (d.isBrand) {
      inner.attr('filter', 'url(#shadow)')
      addBrandImage(inner, { r, image: d.data.img })
    }
  }


  function addCircle(parent, { r=2, fill='black', opacity=1, stroke='none', strokeWidth=0 } = {}) {
    parent.append("circle")
      .attr("r", r)
      .attr('fill', fill)
      .attr('opacity', opacity)
      .attr('stroke', stroke)
      .attr('stroke-width', 1.5)
  }

  function addBrandImage(parent, { r, image }) {
    const href = image.src
      ? image.src
      : '/api/image?id=' + image.id + '&format=' + image.format

    parent.append('image')
      .attr('width', r * 1.5)
      .attr('height', r * 1.5)
      .attr('transform', `translate(${-r * 1.5 / 2}, ${-r * 1.5 / 2})`)
      .attr('href', href)
      .style('filter', 'grayscale(100%)');
  }


  function tick() {
    d3.select(group).selectAll(".item")
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
  }


  
  function makeNodes(territoryTierNodes, products, brands) {
    const nodes = []

    territoryTierNodes.forEach(node => {
      const nodeColor = d3.hcl(d3.color(MARKET_COLORS['tr-' + node.id])).darker(2)

      const t = textures.lines().size(3).strokeWidth(1).background().stroke(nodeColor)
      tierTextures[node.id] = t
      
      const items = [
        ...brands.filter(d => d.territoryTierId === node.id),
        ...products.filter(d => d.territoryTierId === node.id)
      ]

      // Shuffle Items
      items.sort(() => Math.random() < .5 ? -1 : 1);

      const { startAngle, endAngle, innerRadius, outerRadius } = node.data;
      const middleRadius = innerRadius + (outerRadius - innerRadius) / 2;

      const angleScale = d3.scalePoint()
        .domain(d3.range(items.length))
        .range([startAngle - Math.PI / 2, endAngle - Math.PI / 2])
        .align(0.5)
        .padding(5);

      items.forEach((item, i) => {
        const isBrand = !item.hasOwnProperty('brandId')
        const angle = angleScale(i)

        nodes.push({
          territoryTierId: node.id,
          data: item,
          isBrand,
          type: isBrand ? "brand" : "product",
          fill: isBrand ? "white" : item.brandArchitecture === 'Innovation' ? t.url() : nodeColor,
          x: middleRadius * Math.cos(angle),
          y: middleRadius * Math.sin(angle),
          active: true
        })
      })
    })

    return nodes
  }

  function filterNodes(nodes, filters) {
    if (!nodes || !filters) return false

    return nodes.map(node => {
      let active = true

      if (!node.isBrand) {
        if (filters.brandIds.length > 0 && !filters.brandIds.includes(node.data.brandId)) active = false
        if (filters.brandArchitectures.length > 0 && !filters.brandArchitectures.includes(node.data.brandArchitecture)) active = false
        if (filters.productFormats.length > 0 && !filters.productFormats.includes(node.data.format)) active = false
      }

      return { 
        ...node, 
        active,
        r: active ? node.isBrand ? MANDALA_CONFIG.brandRadius : MANDALA_CONFIG.productRadius : 0
      }
    })
  }



</script>

<g bind:this={group} transform="rotate({rotation * 180/Math.PI})" class="items" >
</g>