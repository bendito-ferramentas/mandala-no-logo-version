<script>
  import { _ } from "$lib/utils/locale"
  import NavArrow from "$lib/icons/NavArrow.svelte";
	import { intro, menu } from "$lib/stores";

  const totalSlides = 7
  let index = 0

  function next() {
    if (index < totalSlides) index++
  }

  function back() {
    if (index > 0) index--
  }

  function skip() {
    intro.set(false)
    menu.set('howto')
  }

</script>

<section class="absolute top-0 left-0 w-full h-full flex flex-col justify-center">

  {#if index === 0}
    <figure class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[40%]">
      <img class="w-[100vh] h-[100vh]" src="/assets/colored-mandala-2.svg" />
    </figure>
  {/if}

  <article class="w-full px-24 grid grid-cols-12 gap-6 max-h-[80vh] items-center">
    {#if index === 0}
      <div class="col-start-1 col-span-8">
        <h1 class="text-7xl text-primary font-black">{_("intro.title")}</h1>

        <hr class="mt-16 mb-8 w-72 bg-primary h-0.5"/>

        <div class="flex gap-5">
          <button class="btn btn--primary" on:click={next}>{_("shared.continue")}</button>
          <button class="btn btn--simplest" on:click={skip}>{_("intro.skip")}</button>
        </div>
      </div>

    {:else if index === 1}
      <div class="col-start-3 col-span-8">
        <h1 class="text-5xl font-black text-nowrap">{_("intro.slides.1.title")}</h1>
        <h3 class="text-4xl font-light text-nowrap">{_("intro.slides.1.subtitle")}</h3>

        {#each _("intro.slides.1.p") as p}
          <p class="text-lg my-6">{p}</p>
        {/each}

        <hr class="mt-12 mb-4 w-72 bg-primary h-0.5"/>

        <p class="text-4xl font-black">{_("intro.slides.1.ready")}</p>
        <p class="text-4xl">{_("intro.slides.1.footer")}</p>
      </div>
    {:else if index === 2}

      <div class="col-start-2 col-span-4">
        {#each _("intro.slides.2.p") as p}
          <p class="font-bold text-2xl">{p}</p>
        {/each}
      </div>
      
      <figure class="col-start-6 col-span-6 h-[620px] flex">
        <img class="object-contain" src="/assets/value-drivers.png" />
      </figure>
      
    {:else if index === 3}

      <div class="col-start-2 col-span-3">
        {#each _("intro.slides.3.p") as p}
          <p class="font-bold text-2xl">{p}</p>
        {/each}
      </div>
        
      <figure class="col-start-5 col-span-7 h-[740px] flex">
        <img class="object-contain" src="/assets/convergence-points.png" />
      </figure>

    {:else if index === 4}

      <div class="col-start-2 col-span-4">
        {#each _("intro.slides.4.p") as p}
          <p class="font-bold text-2xl">{p}</p>
        {/each}
      </div>
        
      <figure class="col-start-6 col-span-6 h-[620px] flex">
        <img class="object-contain" src="/assets/competitors.svg" />
      </figure>

    {:else if index === 5}

      <div class="col-start-2 col-span-4">
        {#each _("intro.slides.5.p") as p}
          <p class="font-bold text-2xl">{p}</p>
        {/each}
      </div>
        
      <figure class="col-start-6 col-span-6 h-[620px] flex">
        <img class="object-contain" src="/assets/opaque-mandala.svg" />
      </figure>

    {:else if index === 6}

      <div class="col-start-2 col-span-4">
        {#each _("intro.slides.6.p") as p}
          <p class="font-bold text-2xl">{p}</p>
        {/each}
      </div>
        
      <figure class="col-start-6 col-span-6 h-[620px] flex">
        <img class="object-contain" src="/assets/colored-mandala.svg" />
      </figure>

    {/if}
  </article>

  {#if index != 0}
    <button class="absolute top-1/2 left-12 -translate-y-1/2 w-12 h-12 fill-primary opacity-40 hover:opacity-100 transition-opacity rotate-180" on:click={back}>
      <NavArrow />
    </button>
  {/if}

  {#if index < totalSlides-1}
    <button class="absolute top-1/2 right-12 -translate-y-1/2 w-12 h-12 fill-primary opacity-40 hover:opacity-100 transition-opacity" on:click={next}>
      <NavArrow />
    </button>
  {/if}

  {#if index > 0}
  <div class="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-5">
      {#if index === totalSlides-1}
        <button class="btn btn--primary" on:click={skip}>{_("intro.toHowTo")}</button>
      {:else}
        <button class="btn btn--simplest" on:click={skip}>{_("intro.skip")}</button>
      {/if}
    </div>
  {/if}



</section>
