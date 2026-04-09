<script>
  import { _ } from "$lib/utils/locale";

  export let data
  export let forMacro

</script>

<div class="{forMacro ? 'grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row auto-rows-fr items-stretch' : 'flex flex-col w-3/5 mx-auto'} gap-4">

  {#each data as d (d.fullId)}  
    <button class="overflow-hidden bg-background hover:bg-{d.fullId} hover:text-over-{d.fullId} flex flex-col gap-2.5 justify-center px-5 py-2.5 rounded-2xl text-left transition-colors" on:click={d.onClick}>

      {#if forMacro}
        <p class="text-2xl font-black leading-[1.1]">{@html _(d.key + '.title')}</p>
        <p class="text-sm font-extralight leading-[1.1]">{@html _(d.key + '.desc')}</p>
      {:else}
        <p class="text-sm">{@html _(d.key)}</p>
      {/if}
    </button>
  {/each}

</div>
