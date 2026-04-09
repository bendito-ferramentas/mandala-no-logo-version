<script>
	import MiniSection from './MiniSection.svelte';
  import { select } from '$lib/stores';
  import { getNodeById } from '$lib/utils/helpers';
  import { _ } from "$lib/utils/locale"
  import Image from './Image.svelte';

  export let selected

  const brand = getNodeById('brand', selected.brandId)
</script>

{#if brand}
  <MiniSection title={_('shared.brand')}>
    <p class="font-medium text-base">
      <button class="inline-block" on:click={() => select("brand", brand.id)}>{brand.name}</button>
    </p>
  </MiniSection>
{/if}

<Image image={selected.img} height="11.25rem" width="11.25rem" />

{#if selected.desc}
  <p class="text-lg">{@html selected.desc}</p>
{/if}

<div class="grid grid-cols-2 gap-4">
  <MiniSection title={_('shared.productFormat')}>
    <p class="font-black text-lg">{selected.format}</p>
  </MiniSection>

  <MiniSection title={_('shared.brandArchitecture')}>
    <p class="font-black text-lg">{selected.brandArchitecture}</p>
  </MiniSection>
</div>

{#if selected.claims && selected.claims.length > 0}
<MiniSection title={_('shared.claims')} gap=1>
  <ul class="flex flex-wrap gap-1">
    {#each selected.claims as claim}
      <li class="claim-tag">{claim}</li>
    {/each}
  </ul>
</MiniSection>
{/if}

<hr class="bg-primary" />