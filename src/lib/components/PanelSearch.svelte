<script>
  import { data } from "$lib/stores"

  import PanelSearchResultList from "./PanelSearchResultList.svelte";
  import { _ } from "$lib/utils/locale";

  let searchInput

  $: macro = filter($data.macro, searchInput)
  $: territories = filter($data.territories, searchInput)
  $: brands = filter($data.brands, searchInput)
  $: products = filter($data.products, searchInput)

  function filter(arr, searchInput) {
    if (!searchInput) return arr
    return arr.filter(d => d.name.toLowerCase().includes(searchInput.toLowerCase()))
  }

</script>


<input type="text" class="search-input" bind:value={searchInput} placeholder={_('shared.browse')} />

<PanelSearchResultList data={macro} segment="macro" />
<PanelSearchResultList data={territories} segment="territory" />
<PanelSearchResultList data={brands} segment="brand" />
<PanelSearchResultList data={products} segment="product" />

