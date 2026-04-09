<script>
  import { _ } from "$lib/utils/locale";
  import { select } from "$lib/stores";

  export let data
  export let segment



</script>

<div class="flex flex-col gap-1.5 pt-4 border-t border-t-primary">
  <h3 class="text-xl font-black">
    {_('shared.' + segment)}
  </h3>
  {#if data.length}
  <ul class="pl-4 flex flex-col gap-1">
    {#each data as node}
    <li><button class="select-link" on:click={() => select(segment, node.id)}>{node.name}</button></li>
    {/each}
  </ul>
  {:else}
    <p class='text-sm italic'>{_('shared.noresults')}</p>
  {/if}
</div>