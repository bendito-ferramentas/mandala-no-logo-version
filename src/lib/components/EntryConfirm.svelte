<script>
  import { onMount } from "svelte";
  import { entry  } from "$lib/stores";

  export let options
  export let selected
  export let onStart = undefined

  onMount(() => {
    if (onStart) onStart()
  })
</script>

<ul class="flex flex-wrap justify-center gap-x-4 gap-y-6 px-6">
  {#each options as option}
    <li class="text-base">
      <input id={option.name} class="checkbox" bind:group={selected} type="checkbox" value={option.name} />
      <label for={option.name}>{option.name}</label>
    </li>
  {/each}
</ul>

