<script>
  export let title
  export let options
  export let selected
</script>


<div class="flex flex-col gap-2.5">
  <h4 class="font-bold text-2xl">{title}</h4>
  <ul class="flex flex-col gap-1 ml-1">
    {#each options as option}
    {@const id = crypto.randomUUID()}
      <li class="flex items-center">
        <input bind:group={selected} {id} value={option.value} type="checkbox" class="relative shrink-0
    appearance-none w-5 h-5 border border-primary border-opacity-50 rounded-sm bg-background
    mt-1 checked:bg-primary cursor-pointer" />
        <label for={id} class="pl-2.5 flex-grow">{option.name}</label>
      </li>
    {/each}
  </ul>
</div>