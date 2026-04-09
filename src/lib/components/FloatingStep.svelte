<script context="module">
  let currentIndex
  let previousIndex

  function updateIndex(newIndex) {
    previousIndex = currentIndex
    currentIndex = newIndex

  }
</script>

<script>
  import { fly } from 'svelte/transition'
  import * as d3 from "d3"
	import { afterUpdate, beforeUpdate } from 'svelte';

  export let index
  export let stepTitle = false
  export let onClose = () => {}

  $: updateIndex(index)

  function getDirection(current, previous) {
    return index === 0 || current > previous ? 1 : -1
  }

</script>

<div class="absolute top-0 left-0 w-full h-full rounded-lg bg-white pt-4 px-4 pb-0 grid grid-rows-[max-content_minmax(0,1fr)]"
  out:fly={{ opacity: 0, x: -48 * getDirection(currentIndex, previousIndex), duration: 200, easing: d3.easeQuadOut }} 
  in:fly={{ opacity: 0, x: 24 * getDirection(currentIndex, previousIndex), duration: 100, delay: 150, easing: d3.easeQuadOut }} 
>

<!-- Header -->
 <div class="grid grid-cols-3 items-end">
    <slot name="header-left" />
    {#if stepTitle}
      <h3 class="col-start-2 text-center font-semibold text-nowrap">{stepTitle}</h3>
    {/if}
    <button class="col-start-3 justify-self-end" on:click={onClose}>X</button>
  </div>

  <!-- Body -->
  <div class="flex flex-col overflow-auto relative">
    <slot />
  </div>

  <!-- Footer -->
  {#if $$slots.footer}
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2">
      <slot name="footer" />
    </div>
  {/if}

  <!-- Nav Arrows -->
  {#if $$slots.nav}
    <slot name="nav" />
  {/if}

</div>