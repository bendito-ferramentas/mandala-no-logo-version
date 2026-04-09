<script>
  import * as d3 from "d3"

	import { onDestroy, onMount, setContext } from "svelte"
  import { writable } from "svelte/store"
  import { tweened } from "svelte/motion"

  import { MANDALA_CONFIG, MARKET_COLORS, UI_COLORS } from '$lib/utils/constants'
  import { menu, mandalaLayout, data, addHoveredItem, removeHoveredItem, updateHoveredItemPosition, select, selected } from "$lib/stores";
  import { rad2deg, calculateMinOffset } from "$lib/utils/helpers"
  import gsap from "gsap"
  import { _ } from "$lib/utils/locale"
  
  import zoomAction from "$lib/actions/zoomAction"

	import ArcText from "./ArcText.svelte"
  import MandalaItems from "./MandalaItems.svelte"
	import MandalaFloatingContainer from "./MandalaFloatingContainer.svelte";


  export let showNodes = true
  export let territoryTitle = true
  export let macroTitle = true
  export let tiers = true
  export let showCore = true

  export let offsetX = 0
  export let offsetY = 0
  export let innerRadius = 75
  export let outerRadius = 380

  export let territoryTitleOffset = 10

  export let macroLength = 60
  export let macroBorderThickness = 4
  export let macroTitleOffset = 10

  const nTiers = 4

  const t_offsetX = tweened(offsetX, { duration: 500, easing: d3.easeCubicOut })
  const t_offsetY = tweened(offsetY, { duration: 500, easing: d3.easeCubicOut })
  const t_rotation = tweened(0, { duration: 750, easing: d3.easeQuadInOut })

  let svg
  let unsubscribe

  onMount(() => {
    unsubscribe = selected.subscribe(updateOpacity)
  })

  onDestroy(() => {
    if (unsubscribe) unsubscribe()
  })

  $: t_offsetX.set(offsetX)
  $: t_offsetY.set(offsetY)

  $: rotateIfNeeded($selected)

  // Will react whenever the rotation changes
  $: arc = d3.arc()
    .startAngle(d => d.startAngle + $t_rotation)
    .endAngle(d => d.endAngle + $t_rotation)
    .innerRadius(d => d.innerRadius)
    .outerRadius(d => d.outerRadius)
    .padAngle(d => d.padAngle || 0)
    .cornerRadius(d => d.cornerRadius || 0)

  $: tierRadiusScale = d3.scaleBand()
    .domain(d3.range(nTiers))
    .range([ innerRadius, outerRadius - macroLength ])

  $: territoryTierNodes = $mandalaLayout.territories
    .map(territoryNode => territoryNode.data.territoryTierIds.map((ttId, i) => ({ 
      id: ttId, 
      territoryNode,
      data: makeTerritoryTierNode(territoryNode, i, tierRadiusScale) 
    }))).flat()


  function rotateIfNeeded(selected) {
    if ($mandalaLayout && selected && (selected.segment === 'territory' || selected.segment === 'macro')) {
      const currentAngle = $mandalaLayout[selected.segmentGroup].find(d => selected.id === d.data.id).middleAngle
      const offset = calculateMinOffset(currentAngle, 225*Math.PI/180)
      t_rotation.set(offset)
    }
    else {
      t_rotation.set(0)
    }
  }


  function makeThickArcNode(node) {
    const { startAngle, endAngle, padAngle } = node
    return { startAngle, endAngle, padAngle, innerRadius, outerRadius }
  }

  function makeThinArcNode(node) {
    const { startAngle, endAngle, padAngle } = node
    const innerRadius = outerRadius - macroBorderThickness
    return { startAngle, endAngle, padAngle: padAngle*.75, innerRadius, outerRadius }
  }

  function makeMacroTitleNode(node) {
    const { startAngle, endAngle } = node
    const radius = outerRadius + macroTitleOffset
    return { startAngle, endAngle, innerRadius: radius, outerRadius: radius }
  }

  function makeTerritoryTitleNode(node) {
    const { startAngle, endAngle } = node
    const radius = outerRadius - macroLength + territoryTitleOffset
    return { startAngle, endAngle, innerRadius: radius, outerRadius: radius }
  }

  function makeTerritoryTriggerNode(node) {
    const { startAngle, endAngle } = node
    return { startAngle, endAngle, innerRadius: outerRadius - macroLength, outerRadius }
  }

  function makeMacroTriggerNode(node) {
    const { startAngle, endAngle } = node
    return { startAngle, endAngle, innerRadius: outerRadius, outerRadius: outerRadius + 3*macroTitleOffset }
  }

  function makeTerritoryTierNode(node, i, scale) {
    const { startAngle, endAngle } = node

    const innerRadius = scale(i)
    const outerRadius = innerRadius + scale.bandwidth() - MANDALA_CONFIG.tierPad
    const padAngle = 1/outerRadius
    const cornerRadius = MANDALA_CONFIG.cornerRadius

    return { startAngle, endAngle, innerRadius, outerRadius, padAngle, cornerRadius }
  }

  function onMouseEnter(e, node, type) {
    const [ x, y ] = d3.pointer(e, window)
    addHoveredItem(node, type, x, y)
  }

  function onMouseLeave() {
    removeHoveredItem()
  }

  function onMouseMove(e) {
    const [ x, y ] = d3.pointer(e, window)
    updateHoveredItemPosition(x, y)
  }

  function updateOpacity(selectedNode) {
    const transitionableNodes = d3.select(svg).selectAll('.transitionable').nodes()

    function opacity(i, el) {
      if (!selectedNode || selectedNode.segment === 'product') return 1
      if (el.classList.contains(selectedNode.fullId)) return 1
      return .3
    }

    gsap.to(transitionableNodes, { opacity, duration: .25, ease: 'power2.inOut' })
  }


</script>

{#if $menu !== 'new' && $menu !== 'howto' && arc}
<svg bind:this={svg} class="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
<g transform="translate({$t_offsetX}, {$t_offsetY})"> <!-- // {$t_mandalaOffsetX}, {$wHeight/2} -->
<g use:zoomAction={{ selected: !!$selected }}>
  <circle class="inner-zoom-trigger" r={outerRadius + macroTitleOffset*2} fill="transparent" />


  <!-- Macro -->
  {#each $mandalaLayout.macro as macroNode, i (macroNode.data.id)}
    <g>
      <g class="transitionable {macroNode.data.fullId}">
        <path d={arc(makeThickArcNode(macroNode))} class="fill-{macroNode.data.fullId}-lighter" />
        <path d={arc(makeThinArcNode(macroNode))} class="fill-{macroNode.data.fullId}" />
      </g>

      <!-- Macro Title -->
      {#if macroTitle}
        <g>
          <ArcText {arc} data={makeMacroTitleNode(macroNode)} text={macroNode.data.name} font={{ uppercase: true, letterSpacing: '.1em' }}  />
          
          <path d={arc(makeMacroTriggerNode(macroNode))} class="fill-transparent cursor-pointer" 
            on:mouseenter={e => onMouseEnter(e, macroNode.data, 'macro')}
            on:mouseleave={onMouseLeave}
            on:mousemove={onMouseMove}
            on:click={() => select("macro", macroNode.data.id)}
            on:keydown={e => e.key === 'Enter' && select("macro", macroNode.data.id)}
            aria-label="{_('shared.select')} {_('shared.macro')}"
            role="button"
            tabindex="0"
          />
        </g>
      {/if}

      {#each macroNode.data.territoryIds as territoryId}
        <path d={arc(makeThinArcNode(macroNode))} class="fill-tr-{territoryId}" />
      {/each}

    </g>

  {/each}

  <!-- Territory -->
  {#each $mandalaLayout.territories as territoryNode (territoryNode.data.id)}
    <g>
      {#each territoryNode.data.territoryTierIds as territoryTierId}
      {@const territoryTierNode = territoryTierNodes.find((node) => node.id === territoryTierId && node.territoryNode.data.id === territoryNode.data.id)}
        <path d={arc(territoryTierNode.data)} class="transitionable {territoryNode.data.fullId} mt-{territoryNode.data.macroId} fill-tr-{territoryTierNode.id} " />
      {/each}

      <!-- Territory Title -->
      {#if territoryTitle}
        <g>
          <ArcText {arc} data={makeTerritoryTitleNode(territoryNode)} text={territoryNode.data.name} font={{ size: 14, uppercase: true, weight: 700 }} fill={MARKET_COLORS[territoryNode.data.fullId]} />
          
          <path d={arc(makeTerritoryTriggerNode(territoryNode))} class="fill-transparent cursor-pointer" 
            on:mouseenter={e => onMouseEnter(e, territoryNode.data, 'territory')}
            on:mouseleave={onMouseLeave}
            on:mousemove={onMouseMove}
            on:click={() => select("territory", territoryNode.data.id)}
            on:keydown={e => e.key === 'Enter' && select("territory", territoryNode.data.id)}
            aria-label="{_('shared.select')} {_('shared.territory')}"
            role="button"
            tabindex="0"
          />
        </g>
      {/if}
    </g>
  {/each}



  <!-- Tiers -->
  {#if tiers}
  <g class="transitionable" transform="rotate({rad2deg($t_rotation)})">
  {#each $mandalaLayout.tiers as tierAngle}
  {#each d3.range(nTiers) as index}
  {@const radius = tierRadiusScale(index) + tierRadiusScale.bandwidth() / 2}
  {@const x = radius * Math.cos(tierAngle)}
  {@const y = radius * Math.sin(tierAngle)}
    <g transform="translate({x}, {y})">
      <circle r={MANDALA_CONFIG.tierRadius} fill={UI_COLORS.background} />
      <text 
        class="pointer-events-none"
        transform="rotate({rad2deg(-$t_rotation)})"
        fill={UI_COLORS['text-primary']}
        font-family="Mandioca" 
        text-anchor="middle" 
        font-size=10 
        opacity=0.8
        font-weight=600
        dy=".4em"
      >
        T{index}
      </text>
    </g>
  {/each}
  {/each}
  </g>
  {/if}

  <!-- Items -->
  {#if showNodes}
    <defs>
      <filter id="shadow">
        <feDropShadow dx="1" dy="1.6" stdDeviation="2" flood-color="rgba(0, 0, 0, 0.4)" />
      </filter>
    </defs>

    <MandalaItems {territoryTierNodes} rotation={$t_rotation} />
  {/if}


  {#if showCore}
  {@const coreWords = _("mandala.core").split(' ')}
  <text class="fill-primary text-lg font-thin" text-anchor="middle">
    {#each coreWords as word, i}
    <tspan x=0 y="{(i - coreWords.length/2)}em" dy=".75em">{word}</tspan>
    {/each}
  </text>
  {/if}

</g>
</g>
</svg>
{/if}



<MandalaFloatingContainer />



