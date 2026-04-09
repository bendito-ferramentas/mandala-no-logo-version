<script>
  import { menu, selected } from "$lib/stores"

  import Home from "$lib/icons/Home.svelte";
  import Add from "$lib/icons/Add.svelte";
  import Search from "$lib/icons/Search.svelte";
  import File from "$lib/icons/File.svelte";
	import HowToRead from "$lib/icons/HowToRead.svelte";

  const options = [
    { id: 'home', name: 'Home', src: Home },
    { id: 'search', name: 'Search', src: Search },
    { id: 'new', name: 'New', src: Add },
    { id: 'howto', name: 'How to Read', src: HowToRead },
  ]


  function onClick(optionId) {
    if (optionId === 'search' && $selected) {
      selected.set(null)
      menu.set('search')
    }
    else if (optionId === $menu) {
      menu.set(false)
    } 
    else {
      selected.set(null)
      menu.set(optionId)
    }
  }

</script>

<nav class="absolute top-1/2 -translate-y-1/2 {$menu ? "ml-6" : "ml-8"} transition-all duration-750 ease-in-out flex flex-col gap-2.5 rounded-3xl p-2.5 bg-white pointer-events-auto">
  {#each options as option (option.id)}
  {@const selectedOption = $menu === option.id}
  {@const marked = selectedOption || (option.id === 'search' && !!$selected)}
    <button 
      title={option.name} 
      class="{$menu ? "w-12 h-12" : "w-16 h-16"} rounded-2xl {marked ? 'bg-primary' : 'bg-background'} flex justify-center items-center transition-all before:duration-300 overflow-hidden relative
      {!marked ? "before:content-[''] before:bg-primary before:opacity-0 before:hover:opacity-10 before:block before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-0 before:h-0 before:hover:w-full before:hover:h-full before:transition-all before:duration-300 before:ease-in-out before:rounded-2xl before:z-0" : ''}
      "
      on:click={() => onClick(option.id)}
    >
      <figure class="pointer-events-none {marked ? 'fill-background' : 'fill-primary'}" aria-hidden='true'>
        <svelte:component this={option.src} />
      </figure>
    </button>
  {/each}
</nav>