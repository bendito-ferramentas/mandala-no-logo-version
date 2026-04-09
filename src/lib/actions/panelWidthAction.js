import { get } from "svelte/store"
import { width, panelWidth } from "$lib/stores"

export default function panelWidthAction(node) {
  width.subscribe(update)

  node.addEventListener('resize', update)

  function update() {
    let _panelWidth = 0
    
    const rect = node.getBoundingClientRect()
    _panelWidth = rect.x + rect.width

    panelWidth.set(_panelWidth)
  }

  return {
    update,
    destroy: () => {
      panelWidth.set(0)
    }
  }
}