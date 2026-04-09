<script>
	import { _ } from "$lib/utils/locale";
  import { data, entry, productClaims } from "$lib/stores";
	import ImageSearch from "$lib/icons/ImageSearch.svelte";
	import Plus from "$lib/icons/Plus.svelte";
  import Dropdown from "./Dropdown.svelte";

  export let openClaims = false

  const imgMaxSize = 2 * 1024 * 2014
  const descMaxLength = 600


  $: labels = [
    { key: "shared.brand", value: $entry.brand.name },
    { key: "shared.productType", value: $entry.architecture },
    { key: "shared.productFormat", value: $entry.format },
    { key: "shared.territory", value: $entry.territory.name }
  ]

  function handleFileInput(e) {
    const selectedFile = e.target.files[0]

    if (selectedFile && selectedFile.size <= imgMaxSize) {
      $entry.imgFile = selectedFile
    } 
    else {
      $entry.imgFile = null
    }
  }

  function handleOpenClaims() {
    openClaims = true
  }

</script>

<div class="h-full grid grid-rows-[max-content_minmax(0,1fr)]">

  <!-- Header -->
  <div class="pb-6 border-b border-b-primary mx-10 ">
    <!-- Name -->
    <h2 class="font-black text-6xl">{$entry.name}</h2>

    <!-- Segmentation -->
    <ul class="flex flex-row gap-6 mt-4">
      {#each labels || [] as label, i}
        <li class="flex flex-col">
          <p class="text-sm font-extralight">{_(label.key)}</p>
          <p class="text-base {i === 3 ? 'font-black text-' + $entry.territory.fullId : 'font-medium'}">{label.value}</p>
        </li>
      {/each}


        
    </ul>

  </div>

  <!-- Body -->
  <div class="flex flex-col py-6 px-10 overflow-auto">

    <div class="flex flex-col gap-2.5">
      <h4 class="font-black text-base">{_("shared.tier")}</h4>

      <div class="relative h-fit">
        <select 
          class="font-medium text-primary text-base bg-background rounded-lg pl-6 pr-3 appearance-none hover:bg-background-darker transition-colors"
          bind:value={$entry.tier}
        >
          {#each $data.tiers as tier, i}
            <option value={tier.id}>
              {_('shared.tier').toUpperCase()} {tier.id} - {tier.name}
            </option>
          {/each}
        </select>
        <span class="absolute top-1/2 left-2 -translate-y-[57.5%] pointer-events-none text-primary text-base">
          ▾
        </span>
      </div>
      
    </div>


    <!-- Description -->
    <div class="flex flex-col mt-4 gap-2.5">
      <h4 class="font-black text-base">{_("shared.desc")}</h4>
      <div class="relative">
        <textarea class="w-full h-24 p-2 bg-background rounded-lg text-sm placeholder:italic placeholder:text-primary placeholder:opacity-80 resize-none" maxlength={descMaxLength} placeholder={_("quiz.writeDesc")} bind:value={$entry.description} />
        <p class="absolute bottom-2 right-2 text-xs {(($entry.description?.length || 0) / descMaxLength) < .8 ? 'opacity-40' : 'opacity-100'}">{$entry.description?.length || 0} / {descMaxLength}</p>
      </div>
    </div>
  
    <!-- Claims -->
    <div class="flex flex-col mt-4 gap-2.5">
      <h4 class="font-black text-base">{_("quiz.selectClaims")}</h4>
      <ul class="flex flex-wrap gap-x-2.5 gap-y-2.5">
        {#each $entry.claims || [] as claim} 
        <li>
          <button class="btn btn--removable x" on:click={() => entry.update(d => ({ ...d, claims: d.claims.filter(c => c !== claim) }))}>
            {claim}
          </button>
        </li>
        {/each}
        <li class="relative">
          <button class="cursor-pointer fill-primary opacity-80 hover:opacity-100 transition-opacity" on:click={handleOpenClaims}>
            <Plus />
          </button>
        </li>
      </ul>
    </div>
  
    <!-- Add image -->
    <div class="mt-4 mb-2.5 flex flex-col gap-2.5">
      <h4 class="font-black text-base">{_("quiz.addImage")} <span class="font-extralight">{_("quiz.limitImage")}</span></h4>
      <div class="text-sm h-10 font-medium flex items-center">
        {#if !$entry.imgFile}
          <input id="img-input" class="hidden" type="file" accept=".jpg, .jpeg, .png" size={imgMaxSize} on:change={handleFileInput}>
          <label class="h-10 cursor-pointer flex fill-primary opacity-40 hover:opacity-80 transition-opacity" for="img-input">
            <ImageSearch />
          </label>
        {:else}
          <button class="h-8 bg-primary border border-primary hover:bg-primary-darker text-white py-1.5 px-2.5 rounded-lg transition-all" on:click={() => $entry.imgFile = null}>{$entry.imgFile.name} X</button>
        {/if}
      </div>
    </div>

  </div>


</div>