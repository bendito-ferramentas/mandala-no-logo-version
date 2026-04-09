<script>
	import { onMount, afterUpdate } from "svelte";
  import { fly } from "svelte/transition";
  import * as d3 from "d3"
  import gsap from "gsap";
  import moodboardHeightAction from "$lib/actions/moodboardHeightAction"
  import Image from "./Image.svelte";


  export let selected

  const flyOptions = { y: 24, opacity: 0, duration: 500, delay: 150, easing: d3.easeQuadOut }


  
</script>


<div class="w-full h-full overflow-auto pointer-events-none no-scrollbar flex flex-col justify-end">
  {#if selected.moodboard.length > 0}
        <div class="py-8 grid grid-cols-4 auto-rows-max gap-4 pointer-events-auto" use:moodboardHeightAction>
          {#each selected.moodboard.slice(0, 8) as image, i}
            <figure class="w-full aspect-square bg-white p-2 flex justify-center items-center shadow-lg">
              <Image {image} width="100%" height="100%" />
            </figure>
          {/each}
        </div>
  {/if}
</div>



