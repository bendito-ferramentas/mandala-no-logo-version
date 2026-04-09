import * as d3 from "d3"
import { cutArc } from "$lib/utils/helpers"
import { UI_COLORS } from "$lib/utils/constants"

export default function wrapSVGText(node, { pathId, arc, arcNode, isFlipped, font, fill, margin=12, gap=16 } = {}) {
  const group = d3.select(node)

  function update() {

    const path = group.select('path')
    const text = group.select('text')
    const textPath = group.select('textPath')
  
    const pathLength = path.node().getTotalLength()
    let textLength = textPath.node().getComputedTextLength()
  
    // If the current path length doesn't exceed the original arc, 
    // no need to split lines

    const lines = []
    
    const words = text.text().split(/\s+/).reverse()
    
    let line = []
    while (words.length) {
      const word = words.pop()
      line.push(word)
  
      textLength = textPath.text(line.join(" ")).node().getComputedTextLength()
  
      // If line exceeds path length, remove last word and start new line with the exceeding word
      if (textLength > (pathLength - 2*margin)) {
        line.pop() // Remove word that made the line exceed the path length
        lines.push(line.join(" ")) // Add the line to the lines array
        line = [ word ] // Start a new line with the exceeding word
      }
    }
    lines.push(line.join(" ")) // Add the last line to the lines array
  

    path.remove()
    text.remove()

    group.selectAll('path')
      .data(lines)
      .enter()
    .append('path')
      .attr('id', (_, i) => `${pathId}-${i}`)
      .attr('fill', 'none')
      .attr('stroke', 'none')
      .attr('d', (_, i) => {
        const newArcNode = { ...arcNode }
        newArcNode.innerRadius = arcNode.innerRadius + gap * (!isFlipped ? lines.length-1-i : i)
        newArcNode.outerRadius = newArcNode.innerRadius

        let d = arc(newArcNode)
        return cutArc(d, isFlipped)
      })

    group.selectAll('text')
      .data(lines)
      .enter()
    .append('text')
      .attr('class', 'pointer-events-none')
      .attr('font-size', font.size || 12)
      .attr('font-weight', font.weight || 500)
      .attr('dy', isFlipped ? ".65em" : "0")
      .attr('fill', fill || UI_COLORS['text-primary'])
      .style('letter-spacing', font.letterSpacing || 'normal')
      .style('text-transform', font.uppercase ? 'uppercase' : 'none')
    .append('textPath')
      .attr('href', (_, i) => `#${pathId}-${i}`)
      .attr('startOffset', '50%')
      .attr('text-anchor', 'middle')
      .text(d => d)
  }

  update()

  return {
    update
  }

}