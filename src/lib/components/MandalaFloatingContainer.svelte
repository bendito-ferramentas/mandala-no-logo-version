<script>
  import { onMount } from "svelte"
  import { hoveredItems } from "$lib/stores"
  import { MANDALA_CONFIG } from "$lib/utils/constants"
  import { fly } from "svelte/transition";
  import { _ } from "$lib/utils/locale"
  import Image from "$lib/components/Image.svelte"


  function getDimensions(node) {
    if (!node) return { width: 0, height: 0 }

    return {
      width: node.offsetWidth,
      height: node.offsetHeight
    }
  }

  function adjustPosition(width, height, x, y) {
    const padding = 2*MANDALA_CONFIG.productRadius
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    let adjustedX = x - width/2
    let adjustedY = y - padding - height

    // Adjust for top edge
    if (adjustedY < 0) {
      adjustedY = y + padding
    }

    return { adjustedX, adjustedY }
  }

  function positionNode(node, { x, y }) {
    const { width, height } = getDimensions(node)

    const { adjustedX, adjustedY } = adjustPosition(width, height, x, y)

    node.style.left = adjustedX + 'px'
    node.style.top = adjustedY + 'px'
  }


</script>

{#each $hoveredItems as item (item.id)}
  <div 
    class="absolute pointer-events-none" 
    in:fly={{ y: 12, duration: 150 }}
    out:fly={{ y: -12, duration: 150 }}
    on:introstart={e => positionNode(e.target, { x: item.x, y: item.y })}
  >
    <div 
      class="bg-white text-primary shadow-lg rounded-3xl px-5 py-4 flex flex-col {item.type === "brand" || item.type === "product" 
        ? " w-52 gap-2.5" 
        : `max-w-72`}"
      style:transform="translate({item.tx}px, {item.ty}px)"
    >
      <p class="font-extralight text-sm">{_("shared." + item.type)}</p>

      {#if item.type === "brand" || item.type === "product"}

        <figure class="mx-auto" style:width="6rem" style:height="6rem">
        <Image width="100%" height="100%" image={item.data.img} />
        </figure>

        {#if item.type === "product"}
          <h3 class="font-black text-xl">{item.data.name}</h3>
        {/if}

        <div class="grid grid-cols-[max-content_minmax(0,1fr)] gap-2.5 items-center">
          <div class="tier-tag">T1</div>
          <p class="font-extralight text-sm">
            {#if item.type === "brand"}
              {item.data.type}
            {:else}
              {item.data.format}
            {/if}
          </p>
        </div>
      {:else}
        <h3 class="text-{item.data.fullId} {item.type === "territory" ? 'font-black text-4xl' : 'font-medium text-3xl'}">{item.data.name}</h3>
      {/if}
    </div>
  </div>
{/each}