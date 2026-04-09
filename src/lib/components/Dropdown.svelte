<script>
  export let label
  export let options
  export let selected
  export let def = false
</script>

<label class="flex gap-5 justify-center">
  <p class='text-xl opacity-50'>{label}</p>
  <div class="relative h-fit">
    <select 
      class="font-medium text-primary text-base bg-background rounded-lg pl-6 pr-3 appearance-none hover:bg-background-darker transition-colors"
      bind:value={selected}
    >
      {#each options as option, i}
        <option value={option.id} selected={def && def === option.id}>{option.alias}</option>
      {/each}
    </select>
    <span class="absolute top-1/2 left-2 -translate-y-[57.5%] pointer-events-none text-primary text-base">
      ▾
    </span>
  </div>
</label>