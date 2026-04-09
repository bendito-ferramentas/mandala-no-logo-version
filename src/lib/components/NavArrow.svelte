<script>
  import { _ } from "$lib/utils/locale"
  import NavArrow from "$lib/icons/NavArrow.svelte"
  
  export let size="48px"
  export let direction = "R"
  export let edgePad = "48px"
  export let onClick = () => {}
</script>

<button 
  class="absolute top-1/2 -translate-y-1/2 fill-primary opacity-40 hover:opacity-100 transition-opacity {direction === 'L' ? "rotate-180" : ""}" 
  style:width={size}
  style:height={size}
  style:right={direction === 'R' && edgePad}
  style:left={direction === 'L' && edgePad}
  on:click={onClick}
>
  <NavArrow />
</button>