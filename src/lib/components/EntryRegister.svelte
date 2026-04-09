<script>
  import Dropdown from "$lib/components/Dropdown.svelte";
  import { brands, productTypes, brandArchitectures } from "$lib/stores";
  import { _ } from "$lib/utils/locale";

  export let name
  export let brand
  export let architecture
  export let format

  let brandId

  $: if (brandId) brand = $brands.find(d => d.id === brandId)
</script>


<div class="flex flex-col justify-center gap-6">

  <input class="text-center text-[28px] italic text-primary placeholder:underline placeholder:text-primary placeholder:opacity-50" type="text" placeholder="{_('quiz.inputName')}" bind:value={name}/>

  <Dropdown 
    label={_('quiz.inputBrand')}
    options={[...$brands].sort((a, b) => a.name.localeCompare(b.name)).map(d => ({ id: d.id, alias: d.name }))} 
    bind:selected={brandId}
  />

  <Dropdown 
    label={_('quiz.inputBrandArchitecture')}
    options={[...$brandArchitectures].map(d => ({ id: d, alias: d }))} 
    def="Innovation"
    bind:selected={architecture}
  />

  <Dropdown 
    label={_('quiz.inputProductFormat')}
    options={[...$productTypes].map(d => ({ id: d, alias: d }))} 
    bind:selected={format}
  />

</div>