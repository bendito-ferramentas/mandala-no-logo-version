<script>
  import { getContext } from "svelte";

  import wrapArcText from "$lib/actions/wrapArcText";
  import { cutArc, calcIsFlipped } from "$lib/utils/helpers";
	import { UI_COLORS } from "$lib/utils/constants";

  export let arc
  export let data
  
  export let text
  export let fill
  export let font = {}


  const pathId = 'path-' + crypto.getRandomValues(new Uint32Array(1))[0]

  const isFlipped = calcIsFlipped(data.endAngle)

  let initD = cutArc(arc(data), isFlipped)

</script>


<g use:wrapArcText={{ pathId, arc, arcNode: data, isFlipped, font, fill }}>
  <!-- Invisible path that guides the text -->
  <path id={pathId} class="fill-none stroke-none" d={initD} />

  <text 
    class="pointer-events-none {font.uppercase ? "uppercase" : ''}"
    font-size={font.size || 12}
    font-weight={font.weight || 500}
    style:letter-spacing={font.letterSpacing || 'normal'}
    fill={fill || UI_COLORS['text-primary']}
    dy={isFlipped ? ".65em" : "0" }
  >
    <textPath xlink:href="#{pathId}" text-anchor="middle" startOffset="50%">
      {text}
    </textPath>
  </text>
</g>
