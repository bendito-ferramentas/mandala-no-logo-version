export default function clickOutside(node, callback) {
  let outty = false

  const isTargetOut = (target) => {
    return !node.contains(target)
  }

  const handleMouseDown = (event) => {
    outty = isTargetOut(event.target)
  }

  const handleMouseUp = (event) => {
    if (outty) callback()
  }

  document.addEventListener('mousedown', handleMouseDown, true);
  document.addEventListener('mouseup', handleMouseUp, true)

  return {
    destroy() {
      document.removeEventListener('mousedown', handleMouseDown, true);
      document.removeEventListener('mouseup', handleMouseUp, true);
    }
  };
}