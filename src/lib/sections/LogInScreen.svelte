<script>
	import { onMount } from "svelte";
  import gsap from "gsap";
  import * as d3 from "d3"

  import { loggedin, intro } from "$lib/stores"
  import { _ } from "$lib/utils/locale"
  import { ADMIN_MAIL }  from "$lib/utils/constants"

	import Password from "$lib/components/Password.svelte"

  let backdrop
  let mandala
  let container 

  function onSuccess() {
    gsap.timeline()
      .to(container, { y: -24, opacity: 0, duration: .75, ease: "power2.out" })
      .to(mandala, { scale: 1.15, opacity: .8, duration: 1, ease: "power2.in"}, '<')
      .then(() => {
        loggedin.set(true)
        intro.set(true)
      })
  }

  function onFailure() {
  }

  onMount(() => {
    gsap.timeline()
      .from(backdrop, { opacity: 0, duration: 1.5, ease: "power2.out", delay: .3 })
      .from(mandala, { opacity: 0, scale: 0.4, duration: 4, ease: "power2.out" }, '<=40%')
      .from(container, { y: 12, opacity: 0, duration: 1, ease: "power2.out" }, '<=80%')
  })

 

</script>

<figure bind:this={mandala} class="absolute top-0 left-0 w-full h-full flex justify-center">
  <img src="/assets/colored-mandala.svg" alt="" class="object-contain" />
</figure>

<div bind:this={backdrop} class="absolute top-0 left-0 w-full h-full backdrop-blur-xl"/>

<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
  <div bind:this={container} class="w-96 bg-white rounded-xl shadow p-5 flex flex-col gap-7">
    <h3 class="font-black text-6xl">{_("shared.insertPass")}</h3>
    <Password {onSuccess} {onFailure} />
    <p>{_("shared.contactForPass")} <span class="font-semibold">{ADMIN_MAIL}</span></p>
  </div>
</div>
