<script>
  import { onMount } from "svelte"
  import { browser } from '$app/environment';
  import "../app.css";

  import { 
    width, 
    height, 
    macro, 
    territories, 
    tiers, 
    brands, 
    products, 
    productTypes,
    brandArchitectures,
    productClaims, 
    mandalaLayout,
    inputProducts,
    data as d,
  } from "$lib/stores";

  import { setImageFolders } from "$lib/utils/imageHelpers";

  import App from "$lib/App.svelte";

  export let data

  macro.set(data.body.data.macroTerritories)
  territories.set(data.body.data.territories)
  tiers.set(data.body.data.tiers)
  brands.set(data.body.data.brands)
  products.set(data.body.data.products)
  inputProducts.set(data.body.data.inputProducts)
  productTypes.set(data.body.data.productTypes)
  brandArchitectures.set(data.body.data.brandArchitectures)
  productClaims.set(data.body.data.productClaims)

  // console.log(data.body.data)


  $: browser && console.log('d', $d)
  $: browser && console.log($mandalaLayout)

</script>

<svelte:window bind:innerWidth={$width} bind:innerHeight={$height} />

{#if typeof window !== 'undefined'}
  {#if $width >= 768}
    <App />
  {:else}
    Try again in a larger screen
  {/if}
{/if}

