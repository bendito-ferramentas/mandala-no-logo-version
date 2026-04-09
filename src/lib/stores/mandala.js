import * as d3 from "d3"
import { writable, readable, derived } from "svelte/store";

import { width, height, panelWidth, moodboardHeight } from "./shared"
import { data, macro } from "./data"

import { calcIsFlipped, getMiddleAngle } from "$lib/utils/helpers";

import { MANDALA_CONFIG, MARKET_COLORS, MACRO_ORDER, TERRITORY_ORDER } from "$lib/utils/constants";


export const activeItems = writable([ "brands", "products" ])

export const mandalaOffsetX = derived(
  [width, panelWidth],
  ([$width, $panelWidth]) => $panelWidth + ($width - $panelWidth)/2
)

export const mandalaOffsetY = derived(
  [height, moodboardHeight],
  ([$height, $moodboardHeight]) => $moodboardHeight > 0 ? 0 : $height/2
)

export const radiusExtent = derived([ width, height ], ([ $width, $height ]) => {
  if (!$width || !$height) {
    return 
  }

  const size = Math.min($width, $height) - (2*MANDALA_CONFIG.margin)

  const innerRadius = MANDALA_CONFIG.innerRadiusK * size
  const outerRadius = MANDALA_CONFIG.outerRadiusK * size
  const radiusRange = outerRadius - innerRadius

  return { innerRadius, outerRadius, radiusRange }
})


// Creates a copy of the hierarchical data structure, but adds the pie layout data
export const mandalaLayout = derived([ data ], ([ $data ]) => {

    if (!$data) return
    // Create macro pie layout
    const macroPie = d3.pie()
      .sort((a, b) => MACRO_ORDER.indexOf(+a.id) - MACRO_ORDER.indexOf(+b.id))
      .startAngle(MANDALA_CONFIG.angleOffset)
      .endAngle(MANDALA_CONFIG.angleOffset + 2*Math.PI)
      .padAngle(MANDALA_CONFIG.macroPadAngle)
      .value(d => d.territoryIds.length)

    const macroLayout = macroPie($data.macro)

    const territoryLayout = []

    // As the accessor for the pie layout gets the full data object,
    // and not the individual nodes, it's important to create a layout function for each macro,
    // so that we can pass the start and end angles properly
    let index = 0
    macroLayout.forEach(macroNode => {
      macroNode.middleAngle = getMiddleAngle(macroNode.startAngle, macroNode.endAngle)

      const territories = $data.territories.filter(territory => territory.macroId == macroNode.data.id)

      const territoryPie = d3.pie()
        .sort((a, b) => TERRITORY_ORDER.indexOf(+a.id) - TERRITORY_ORDER.indexOf(+b.id))
        .startAngle(macroNode.startAngle + macroNode.padAngle/2)
        .endAngle(macroNode.endAngle - macroNode.padAngle/2)
        .value(1)

      territoryPie(territories).forEach(node => {
        node.index = index++
        node.middleAngle = getMiddleAngle(node.startAngle, node.endAngle)
        territoryLayout.push(node)
      })
    })

    const tierAngles = []


    territoryLayout
      .map(d => [ d.startAngle, d.endAngle ])
      .sort((a, b) => a[1] - b[1])
      .forEach((current, i, arr) => {
        if (i % 2 === 0 ) return
        const next = arr[(i + 1) % arr.length]

        const thetaInit = current[1]
        const thetaEnd = next[0]

        const angle = getMiddleAngle(thetaInit, thetaEnd)

        tierAngles.push(angle - Math.PI/2)
      })

      return { macro: macroLayout, territories: territoryLayout, tiers: tierAngles }
    }
)


export const hoveredItems = writable([])

let lastHoveredItemId

export function addHoveredItem(data, type, x, y) {
  const id = Date.now()

  hoveredItems.update(items => [
    ...items, 
    { id, data, type, x, y, tx: 0, ty: 0 }
  ])

  lastHoveredItemId = id
}

export function removeHoveredItem() {
  hoveredItems.update(items => items.filter(item => item.id !== lastHoveredItemId))
  lastHoveredItemId = null
}

export function updateHoveredItemPosition(x, y) {
  hoveredItems.update(items => items.map(item => {
    return item.id !== lastHoveredItemId 
      ? item
      : { ...item, tx: x-item.x, ty: y-item.y }
  }))
}