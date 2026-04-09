<script>
  import Mandala from "./components/Mandala.svelte";
  import MainPanel from "./sections/MainPanel.svelte";
  import NewEntry from "./sections/NewEntry.svelte";
  import Filter from "./sections/Filter.svelte";
	import LogInScreen from "$lib/sections/LogInScreen.svelte";
	import Intro from "$lib/sections/Intro.svelte";
  import { width, height, mandalaOffsetX, mandalaOffsetY, loggedin, intro, menu } from "$lib/stores";
	import HowTo from "./sections/HowTo.svelte";

</script>

<main class="relative w-screen h-screen bg-background flex justify-center items-center overflow-hidden">

  <figure class="absolute top-10 left-10 w-64 flex pointer-events-none z-10">
    <img src="/assets/logo.svg" />
  </figure>

  
  {#if !$loggedin}
    <LogInScreen />
  {:else if $intro}
    <Intro />
  {:else}    
    <Mandala offsetX={$mandalaOffsetX} offsetY={$mandalaOffsetY} />
    <Filter />
    <MainPanel />
    <NewEntry />

    {#if $menu === "howto"}
      <HowTo />
    {/if}
  {/if}
</main>