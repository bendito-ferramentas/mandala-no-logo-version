import * as d3 from "d3"
import { get, writable } from "svelte/store";
import { tweened } from "svelte/motion";

export default function zoomAction(node, { defaultK = 1, maxK = 1.5, selected = false } = {}) {
  const zoomFactor = tweened(1)
  const mouseX = writable()
  const mouseY = writable()

  zoomFactor.subscribe(handleZoom)
  mouseX.subscribe(handleZoom)
  mouseY.subscribe(handleZoom)

  const zoom = d3.zoom()
    .on('zoom', zoomed)

  d3.select(node)
    .call(zoom)
    .on("mouseenter", handleMouseEnter)
    .on("mousemove", handleMouseMove)
    .on("mouseleave", handleMouseLeave)
    .on("wheel.zoom", null)
    .on("mouseup.zoom", null)
    .on("click.zoom", null)
    .on("dblclick.zoom", null)
    .on("mousedown.zoom", null)
    .on("touchstart.zoom", null)
    .on("touchmove.zoom", null)
    .on("touchend.zoom", null)
    .on("touchcancel.zoom", null)

  function handleZoom() {
    if (selected) return
    
    const _mouseX = get(mouseX)
    const _mouseY = get(mouseY)
    const _zoomFactor = get(zoomFactor)

    if (_mouseX === undefined || _mouseY === undefined) return

    const transform = d3.zoomIdentity
      .translate(_mouseX, _mouseY)
      .scale(_zoomFactor)
      .translate(-_mouseX, -_mouseY)

    // Triggers zoomed
    d3.select(node).call(zoom.transform, transform)
  }

  // Actually zooms the node
  function zoomed({ transform }) {
    d3.select(node).attr("transform", transform)
  }

  function handleMouseEnter(event) {
    const [ x, y ] = d3.pointer(event);
    mouseX.set(x)
    mouseY.set(y)
    zoomFactor.set(maxK, {
      duration: 500,
      easing: d3.easeQuadOut
    })
  }

  function handleMouseMove(event) {
    const [ x, y ] = d3.pointer(event);
    mouseX.set(x)
    mouseY.set(y)
  }

  function handleMouseLeave() {
    zoomFactor.set(defaultK, {
      duration: 300,
      easing: d3.easeQuadInOut
    })
  }
}