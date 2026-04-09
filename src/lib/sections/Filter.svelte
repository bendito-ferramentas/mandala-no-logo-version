<script>
  import { brandArchitectures, productTypes, data, filters, menu } from "$lib/stores"
  import { _ } from "$lib/utils/locale"
  import FilterList from "$lib/components/FilterList.svelte";
  import { fly } from "svelte/transition";
  import * as d3 from "d3"

  let open = false


  function openFilter() {
    open = true
  }

  function closeFilter() {
    open = false
  }

  
</script>

{#if !$menu || $menu == 'home'}
  
<aside class="absolute bottom-12 right-12">

  {#if !open}
    <button class="absolute font-medium bottom-0 right-0 py-1 px-3 bg-white border border-primary rounded-lg flex gap-1.5 items-center hover:shadow transition-shadow" 
      on:click={openFilter} 
      in:fly={{ y: 24, opacity: 0, duration: 500, delay: 300, ease: d3.easeQuadIn }}
    >
      {_('shared.filter')}
      
      <figure class="flex w-5">
        <img src="/assets/filter.svg" />
      </figure>

    </button>

  {:else}

    <div class="absolute bottom-0 right-0 flex flex-col bg-white rounded-lg w-72 shadow" 
      in:fly={{ y: 24, opacity: 0, duration: 300, ease: d3.easeQuadOut }} 
      out:fly={{ y: 24, opacity: 0, duration: 300, ease: d3.easeQuadIn }}
      >

      <div class="py-4 flex justify-between border-b border-b-primary mx-5">
        <p class="inline-block font-black text-2xl">
          {_('shared.filters')}
        </p>
        <button class="justify-self-end" on:click={closeFilter}>X</button>
      </div>

      <div class="max-h-[60vh] overflow-auto ml-5">
        <div class="flex flex-col gap-5 mr-5 py-5">
          <FilterList 
            title={_('shared.brands')} 
            options={$data.brands.map(d => ({ name: d.name, value: d.id }))} 
            bind:selected={$filters.brandIds} 
          />

          <hr class="border-b border-b-primary" />


          <FilterList 
            title={_('shared.productFormat')} 
            options={$productTypes.map(d => ({ name: d, value: d }))} 
            bind:selected={$filters.productFormats} 
          />

          <hr class="border-b border-b-primary" />

          <FilterList 
            title={_('shared.brandArchitecture')} 
            options={$brandArchitectures.map(d => ({ name: d, value: d }))} 
            bind:selected={$filters.brandArchitectures} 
          />
        </div>

      </div>
    </div>
  {/if}

  

</aside>
{/if}
