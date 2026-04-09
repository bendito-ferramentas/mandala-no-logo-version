<script>
  import { menu } from "$lib/stores"
  import { _ } from "$lib/utils/locale"
  import NavArrow from "$lib/components/NavArrow.svelte";

  import FloatingSteps from "$lib/components/FloatingSteps.svelte";
  import FloatingStep from "$lib/components/FloatingStep.svelte";

  const nSteps = 5

  const steps = Array.from({ length: 5 }).map((_v, i) => ({
    index: i,
    title: _(`howTo.${i + 1}.title`),
    p: _(`howTo.${i + 1}.p`)
  }))
  
  let index = 0

  function back() {
    if (index > 0) index--
  }

  function next() {
    if (index < nSteps) index++
  }

  function startOver() {
    index = 0
  }

  function finish() {
    menu.set(null)
  }

</script>

<FloatingSteps>
  {#each steps as step, i}
  {#if i === index}

    <FloatingStep {index} onClose={finish}>
      <div class="my-auto grid grid-cols-10 mx-20 items-center">
        <div class="col-span-4 flex flex-col gap-4">
          <h3 class="font-black text-4xl">{step.title}</h3>
          <p class="text-xl">{@html step.p}</p>
        </div>

        <figure class="col-span-6 flex justify-center">
          <img src="/assets/opaque-mandala.svg" alt="Mandala" class="w-4/5 object-contain" />
        </figure>
      </div>

      <svelte:fragment slot="nav">
        {#if index != 0}
          <NavArrow direction="L" size="36px" edgePad="24px" onClick={back} />
        {/if}
    
        {#if index < nSteps-1}
          <NavArrow direction="R" size="36px" edgePad="24px" onClick={next} />
        {/if}
      </svelte:fragment>

      <svelte:fragment slot="footer">
        {#if index === nSteps-1}
          <div class="flex gap-4">
            <button class="btn btn--primary" on:click={finish}>{_("howTo.finish")}</button>
            <button class="btn btn--simplest" on:click={startOver}>{_("howTo.restart")}</button>
          </div>
        {/if}
      </svelte:fragment>

    </FloatingStep>

  {/if}
  {/each}
</FloatingSteps>
