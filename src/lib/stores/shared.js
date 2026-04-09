import { writable, derived, get } from "svelte/store";
import { data } from "./data";
import { getNodeById } from "$lib/utils/helpers";

export const width = writable()
export const height = writable()

export const loggedin = writable(true)
export const intro = writable(false)

export const menu = writable(false)
export const selected = writable(null)
export const panelWidth = writable(0)
export const moodboardHeight = writable(0)

export const entry = writable()

export function select(segment, id) {
  menu.set(false)

  const node = getNodeById(segment, id)

  let value = null
  
  selected.update(cur => {
    if (!cur || cur.segment !== segment || cur.id !== node.id) {
      value = node
    }
    return value
  })
}

export function unselect() {
  selected.set(null)
  menu.set(false)
}

menu.subscribe(v => console.log('menu', { menu: v }))
selected.subscribe(v => console.log('selected', { selected: v }))