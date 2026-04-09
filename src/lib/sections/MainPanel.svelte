<script>
	import { onDestroy, onMount } from 'svelte';
  import { fly } from "svelte/transition";
  import * as d3 from "d3"

  import { data, menu, select, selected } from "$lib/stores"
  import { _ } from "$lib/utils/locale";
	import { getNodeById } from '$lib/utils/helpers';
  import panelWidthAction from "$lib/actions/panelWidthAction";
  
  import PanelMenu from "$lib/components/PanelMenu.svelte";
	import Image from '$lib/components/Image.svelte';
	import MiniSection from '$lib/components/MiniSection.svelte';
  import PanelHome from "$lib/components/PanelHome.svelte";
  import PanelSearch from "$lib/components/PanelSearch.svelte";
	import PanelMoodboard from '$lib/components/PanelMoodboard.svelte';

  import PanelMacro from '$lib/components/PanelMacro.svelte';
	import PanelTerritory from '$lib/components/PanelTerritory.svelte';
	import PanelBrand from '$lib/components/PanelBrand.svelte';
	import PanelProduct from '$lib/components/PanelProduct.svelte';

  $: isPanelOpen = ($menu === 'home' || $menu === 'search') || $selected
  $: isMoodboardOpen = $selected && $selected.segment === 'territory' && $selected.moodboard.length > 0

 

  function onClose() {
    menu.set(false)
    selected.set()
  }

</script>

<section id="main-panel-wrapper" class="absolute top-0 left-0 h-full w-full pointer-events-none grid grid-cols-10 gap-5 z-50">

  {#if isPanelOpen}
    <div 
      id="main-panel"
      in:fly={{ x: -24, opacity: 0, duration: 250, easing: d3.easeQuadOut }}
      out:fly={{ x: -24, opacity: 0, duration: 150, easing: d3.easeQuadIn }}
      class="col-start-1 col-span-4 pl-28 overflow-hidden bg-white pointer-events-auto"
    >
      
      <div class="pointer-events-auto rounded-3xl pt-5 pl-5 pr-2.5 grid grid-rows-[max-content_minmax(0,1fr)] gap-4 h-full" use:panelWidthAction>
        
        <!-- Header -->
        <button class="justify-self-end" on:click={onClose}>X</button>

        <!-- Body for Selected -->
        <div class="pt-0 pb-8 overflow-auto">
          <!-- Scrollable -->
          <div class="w-full overflow-hidden grid grid-flow-row gap-7 pr-5">
            {#if $menu === 'home'}
              <PanelHome />
            {:else if $menu === 'search'}
              <PanelSearch />
            {:else if !!$selected}
              <button class="font-extralight text-sm justify-self-start" on:click={() => {
                selected.set(null)
                menu.set('search')
                }}>&lt;&nbsp;{_('shared.back')}</button>

              {#if $selected.segment === 'macro'}
                <PanelMacro selected={$selected} />
              {:else if $selected.segment === "territory"}
                <PanelTerritory selected={$selected} />
              {:else if $selected.segment === "brand"}
                <PanelBrand selected={$selected} />
              {:else if $selected.segment === "product"}
                <PanelProduct selected={$selected} />
              {/if}
            {/if}
          </div>
        </div>

      </div>

    </div>
  {/if}
  
  {#if isMoodboardOpen}
    <aside class="col-start-5 col-span-6 h-full mr-5">
      <PanelMoodboard selected={$selected} />
    </aside>
  {/if}


  <PanelMenu />


</section>