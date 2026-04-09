<script>
	import { _ } from "$lib/utils/locale";
  import { entry, inputProducts } from "$lib/stores";
  import Password from "$lib/components/Password.svelte";
  import { fly } from "svelte/transition";
  import { parseInputProducts } from "$lib/utils/parseData"
  import { SHEET_RANGES } from '$lib/utils/constants'



  let saved = false
  let submitting = false

  async function onSuccess() {
    try {
      submitting = true

      const values = [[
        Date.now(),
        $entry.name, 
        $entry.format, 
        $entry.brand.id, 
        $entry.architecture,
        $entry.description,
        $entry.claims ? JSON.stringify($entry.claims) : '[]',
        $entry.territory.id, 
        $entry.tier,
      ]]

      // Make form data
      const data = new FormData()
      data.append('sheetRange', SHEET_RANGES.inputProducts)
      data.append('sheetValues', JSON.stringify(values))
      
      if ($entry.imgFile) data.append('entryFile', $entry.imgFile)

      const response = await fetch('/api/create-entry', {
        method: 'POST',
        body: data
      })

      if (response.ok) {
        const entry = await response.json()
        const format = parseInputProducts(entry)

        inputProducts.update(arr => {
          if (arr) {
            return [ ...arr, format ]
          }
          return [ format ]
          
        })

        saved = true
      }

    }
    catch (error) {
      console.error('error', error)
    }
    finally { 
      submitting = false
    }

  }


</script>

<div class="w-3/5 mx-auto px-10 relative">
  {#if !saved}
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col gap-8" out:fly={{ opacity: 0, duration: 150 }}>
      <h2 class="font-black text-6xl">{_("quiz.saveConfirm")}</h2>
      <p>{@html _("quiz.insertPass")}</p>
      <div class="transition-opacity {submitting ? "pointer-events-none opacity-50" : "pointer-events-auto opacity-100"}">
        <Password {onSuccess} />
      </div>
    </div>
  {:else}
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col gap-8 text-center" in:fly={{ y: 12, opacity: 0, duration: 500, delay: 200 }}>
      <h2 class="font-black text-6xl">{_("quiz.saveSuccess")}</h2>
    </div>
  {/if}

</div>