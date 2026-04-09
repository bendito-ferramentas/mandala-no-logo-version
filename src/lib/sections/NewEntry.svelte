<script>
  import { fly } from "svelte/transition";
  import * as d3 from "d3"

  import { SHEET_RANGES } from "$lib/utils/constants";

  import { steps } from "$lib/decisionTree";
  import { _ } from "$lib/utils/locale";
  import { menu, data, brands, productTypes, brandArchitectures, productClaims, entry } from "$lib/stores";

  import EntryHeader from "$lib/components/EntryHeader.svelte";
  import EntryButtons from "$lib/components/EntryButtons.svelte";
  import EntryRegister from "$lib/components/EntryRegister.svelte";
  import EntryReview from "$lib/components/EntryReview.svelte";
  import EntryMultiSelect from "$lib/components/EntryMultiSelect.svelte";
  import EntryConfirm from "$lib/components/EntryConfirm.svelte";
  import EntryDisplay from "$lib/components/EntryDisplay.svelte";
  import EntrySave from "$lib/components/EntrySave.svelte";
	import EntryClaimsSelect from "$lib/components/EntryClaimsSelect.svelte";


  let stepId
  let prevStepId
  let pastStepIds = []
  let step

  $: openClaims = false 

  entry.set({})


  $: $menu === "new" && init()

  function init() {
    updateStep(1)
    pastStepIds = []

    entry.set({ tier: '0' })
  }

  function exit() {
    menu.set(null)
  }

  function back() {
    if (pastStepIds.length) updateStep(pastStepIds.pop())
  }

  function next(id) {
    pastStepIds.push(stepId)
    updateStep(id)
  }

  function updateStep(id) {
    prevStepId = stepId || 0
    stepId = id
    step = steps.find(d => d.id === stepId)
  }

  function selectMacro(macro) {
    $entry.macro = macro

    if (macro.territoryIds.length === 1) {
      selectTerritory($data.territories.find(d => d.id === macro.territoryIds[0]))
    }
  }

  function selectTerritory(territory) {
    $entry.territory = territory
  }

</script>

{#if $menu === "new" && stepId >= 0}
<section 
  class="w-3/5 lg:w-3/4 h-3/4 max-h-[730px] relative overflow-hidden" 
  transition:fly={{ y: 24, opacity: 0, easing: d3.easeQuadOut }}
>


  {#key stepId}
    <div 
      out:fly={{ opacity: 0, x: -48 * ((stepId - prevStepId) > 0 ? 1 : -1), duration: 200, easing: d3.easeQuadOut }} 
      in:fly={{ opacity: 0, x: 24 * ((stepId - prevStepId) > 0 ? 1 : -1), duration: 100, delay: 150, easing: d3.easeQuadOut }} 
      class="w-full h-full rounded-lg bg-white p-4 grid grid-rows-[max-content_minmax(0,1fr)_max-content] gap-4"
    >

      <!-- Header -->
       <EntryHeader {step} onBack={back} onExit={exit} />

      <!-- Body -->
      <div class="h-full flex flex-col py-6 overflow-auto">
        <div class="max-h-full my-auto">

        {#if step.template === "register"}

          <EntryRegister 
            bind:name={$entry.name}
            bind:brand={$entry.brand}
            bind:architecture={$entry.architecture}
            bind:format={$entry.format} />

        {:else if step.template === "review"}
          
          <EntryReview bind:openClaims />

        {:else if step.template === "save"}

          <EntrySave />

        {:else}

          <div class="grid grid-flow-row auto-rows-min gap-4 px-6">

            <h4 class="w-3/5 mx-auto text-center text-xl">{@html _(`quiz.steps.${stepId}.main`)}</h4>

            {#if _(`quiz.steps.${stepId}`).list}
            <ul class="w-3/5 mx-auto list-['•'] flex flex-col gap-2.5">
              {#each _(`quiz.steps.${stepId}`).list as li}
                <li class="text-base pl-3">{@html li}</li>
              {/each}
            </ul>
            {/if}

            {#if step.template === "multiple"}
              {@const forMacro = step.for === "macro"}
              {@const nodes = forMacro 
                ? $data.macro.map(d => ({ ...d, key: `quiz.concernings.${d.fullId}`, wide: [3,7].includes(d.id), onClick: () => { 
                  selectMacro(d)
                  next(step.next[0].id) 

                  delete $entry.claims

                } }))
                : $data.territories.filter(d => d.macroId == $entry.macro.id).map(d => ({ ...d, key: `quiz.motivations.${d.fullId}`, onClick: () => { 
                  selectTerritory(d)
                  next(step.next[0].id) 
                } }))
              }

              <EntryMultiSelect {forMacro} data={nodes} />


            {:else if step.template === "confirm"}

              <EntryConfirm 
                options={$productClaims.filter(d => d.macroId === $entry.macro.id)}
                bind:selected={$entry.claims} 
                />
    

            {:else if step.template === "display"}

              <EntryDisplay 
                selected={step.for === "macro" ? $entry.macro : $entry.territory} />

            {/if}

          </div>
        {/if}

      </div>
          
      </div>

      <!-- Footer -->
      <EntryButtons {step} onNext={next} />

    </div>

    {/key}
</section>


  <EntryClaimsSelect bind:isOpen={openClaims} />
{/if}
