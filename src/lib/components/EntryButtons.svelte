<script>
  import { entry, menu } from "$lib/stores"
  import { _ } from "$lib/utils/locale";

  export let step
  export let onNext

  function nextFactory(id) {
    if (id) {
      return () => onNext(id)
    }
    else if (step.template === "display" && step.for === "macro") {
      return $entry.macro.territoryIds.length === 1 
      ? () => onNext(8) 
      : () => onNext(7)
    }
     
  }

  function disabled(next, entry) {
    if (step.template === "register" && !entry.name) return true
    if (step.template === "confirm" && next.primary && (!entry.claims || !entry.claims.length)) return true
    return false
  }

</script>

<div class="flex justify-center gap-2">

  {#if step.template !== "save"} 
    {#each step.next.filter(d => d.key) as _next, i}

      <button 
        class="btn { _next.primary ? 'btn--primary' : 'btn--secondary'}" 
        disabled={disabled(_next, $entry)} 
        on:click={nextFactory(_next.id)}
      >
        {_(_next.key)}
      </button>  

    {/each} 

  {:else if $entry.saved}
    <button class="btn btn--primary" on:click={() => menu.set(null)}>
      {_(step.next[0].key)}
    </button>  
  {/if}


</div>