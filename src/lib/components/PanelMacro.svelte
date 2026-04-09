<script>
	import MiniSection from './MiniSection.svelte';
  import { select } from '$lib/stores';
  import { getNodeById } from '$lib/utils/helpers';
  import { _ } from "$lib/utils/locale"
  import Image from './Image.svelte';

  export let selected
</script>

<MiniSection title={_('shared.macro')}>
  <h3 class="font-medium text-4xl text-{selected.fullId}">{selected.name}</h3>
</MiniSection>

{#if selected.desc}
  <p class="text-lg">{@html selected.desc}</p>
{/if}

<hr class="bg-primary" />

<div class="flex flex-col gap-4">
  <p class="font-black">{selected.territoryIds.length} {_(selected.territoryIds.length > 1 ? 'shared.territories' : 'shared.territory')}</p>

  <ul>
    {#each selected.territoryIds as territoryId}
    {@const territory = getNodeById('territory', territoryId)}
      <li>
        <button class="text-left font-black text-2xl text-{territory.fullId}" on:click={() => select('territory', territoryId)}>
          {territory.name}
        </button>
      </li>
    {/each}
  </ul>
</div>
