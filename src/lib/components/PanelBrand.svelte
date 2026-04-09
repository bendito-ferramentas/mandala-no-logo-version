<script>
	import MiniSection from './MiniSection.svelte';
  import { select } from '$lib/stores';
  import { getNodeById } from '$lib/utils/helpers';
  import { _ } from "$lib/utils/locale"
  import Image from './Image.svelte';

  export let selected

</script>

<MiniSection title={_('shared.company')}>
  <p class="font-medium text-base">{selected.type}</p>
</MiniSection>

<Image image={selected.img} height="11.25rem" width="11.25rem" />

{#if selected.desc}
  <p class="text-lg">{@html selected.desc}</p>
{/if}

{#if selected.role}
  <MiniSection title={_('shared.brandRole')}>
    <p class="font-black text-xl">{@html selected.role}</p>
  </MiniSection>
{/if}

{#if selected.bci}
  <p class="font-light italic text-3xl">{@html selected.bci}</p>
{/if}

<hr class="bg-primary" />

{#if selected.explanationMacro}
  <p class="font-light text-lg">{@html selected.explanationMacro}</p>
{/if}


{#if selected.productIds && selected.productIds.length > 0}
<hr class="bg-primary" />
<div class="flex flex-col gap-4">
  <p class="font-black">{selected.productIds.length} {_('shared.products')}</p>
  <ul>
    {#each selected.productIds as productId}
    {@const product = getNodeById('product', productId)}
        <li><button class="select-link select-link--sm" on:click={() => select('product', productId)}>{product.name}</button></li>
      {/each}
  </ul>
</div>
{/if}