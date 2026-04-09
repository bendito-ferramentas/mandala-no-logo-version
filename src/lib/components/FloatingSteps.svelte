<script>
  import { fly } from 'svelte/transition';
  import * as d3 from "d3"

  const FLY_ENTRANCE = { y: 24, opacity: 0, easing: d3.easeQuadOut }
</script>

<section class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/5 lg:w-3/4 h-3/4 max-h-[730px]" 
  transition:fly={FLY_ENTRANCE}
>
  <slot />
</section>