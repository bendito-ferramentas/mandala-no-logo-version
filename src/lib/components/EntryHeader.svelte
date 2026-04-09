<script>
  import { _ } from "$lib/utils/locale"

  export let step
  export let onBack
  export let onExit
</script>


<div class="grid grid-cols-3 items-end">

  <button class="justify-self-start {step.id <= 2 ? 'hidden' : ''}" on:click={onBack}>
    &lt;&nbsp;{_('shared.back')}
  </button>

  <h3 class="col-start-2 text-center font-semibold text-nowrap">{_('quiz.title')}</h3>

  <button class="col-start-3 justify-self-end" on:click={onExit}>
    X
  </button>

</div>