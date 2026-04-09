<script>
	import MiniSection from './MiniSection.svelte';
  import { select } from '$lib/stores';
  import { getNodeById } from '$lib/utils/helpers';
  import { _ } from "$lib/utils/locale"
  import Image from './Image.svelte';

  export let selected

  const macro = getNodeById("macro", selected.macroId)

</script>

<MiniSection title={_('shared.macro')}>
  <h3 class= "font-medium text-base uppercase text-{macro.fullId}">
    <button on:click={() => select('macro', macro.id)}>{macro.name}</button>
  </h3>
</MiniSection>

<MiniSection title={_('shared.territory')}>
  <h3 class= "font-medium text-4xl text-{selected.fullId}">{selected.name}</h3>
</MiniSection>

{#if selected.desc}
  <p class="text-lg">{@html selected.desc}</p>
{/if}

{#if selected.activates}
  <p class="font-black text-lg">{@html selected.activates}</p>
{/if}

{#if selected.trends && selected.trends.length > 0}
  <ul class="overflow-hidden">
    {#each selected.trends as trend}
      <li class="underline text-light italic text-3xl block text-nowrap text-ellipsis">#{trend}</li>
    {/each}
  </ul>
{/if}

{#if selected.claims && selected.claims.length > 0}
  <MiniSection title={_('shared.keyClaims')}>
    <ul class="flex flex-wrap gap-1">
      {#each selected.claims as claim}
        <li class="claim-tag">{claim}</li>
      {/each}
    </ul>
  </MiniSection>
{/if}

{#if selected.productIds && selected.productIds.length > 0}
<div class="flex flex-col gap-4">
  <p class="font-black">{selected.productIds.length} {_('shared.products')}</p>
  {#each selected.territoryTierIds as territoryTierId}
  {@const territoryTier = getNodeById('territoryTier', territoryTierId)}
    {#if territoryTier.productIds && territoryTier.productIds.length > 0}
      <div>
        <h4 class="bg-background rounded-full text-sm uppercase px-4 py-1.5"><span class="font-black">{_('shared.tier')} {territoryTier.tierId}</span> - {_('tiers.' + territoryTier.tierId)}</h4>
        <ul class='pl-4'>
          {#each territoryTier.productIds as productId}
          {@const product = getNodeById('product', productId)}
          <li><button class="select-link select-link--sm" on:click={() => select('product', productId)}>{product.name}</button></li>
          {/each}
        </ul>
      </div>
    {/if}
  {/each}
</div>
{/if}