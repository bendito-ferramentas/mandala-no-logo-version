import { get } from "svelte/store"
import { height, moodboardHeight } from "$lib/stores"

export default function moodboardHeightAction(node) {
  height.subscribe(update)

  node.addEventListener('resize', update)

  function update() {
    let _moodboardHeight = 0
    
    if (node) {
      const { height } = node.getBoundingClientRect()
      _moodboardHeight = height
    }

    moodboardHeight.set(_moodboardHeight)
  }

  return {
    update,
    destroy: () => {
      moodboardHeight.set(0)
    }
  }
}