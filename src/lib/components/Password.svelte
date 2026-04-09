<script>
  import { _ } from "$lib/utils/locale";
  import gsap from "gsap";

  export let onSuccess
  export let onFailure

  let inputEl
  let password

  async function handleSubmit() {
    const response = await fetch('/api/password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })

    const { success } = await response.json()

    password = ''

    if (success) {
      if (onSuccess) onSuccess()
    }
    else {
      shakeIt()
      if (onFailure) onFailure()
    }
  }

  function shakeIt() {
    gsap.timeline({ repeat: 2, onComplete: () => inputEl.focus() })
      .to(inputEl, { x: -2, duration: 0.05})
      .to(inputEl, { x: 2, duration: 0.05})
      .to(inputEl, { x: 0, duration: 0.025})
  }

</script>

<form class="flex gap-4">
  <input bind:this={inputEl} type="password" class="flex-1 p-2 bg-background rounded-lg text-primary placeholder:italic placeholder:opacity-80 resize-none"  placeholder="● ● ● ● ● ● ●" bind:value={password} />
  <button class="btn btn--primary" type="submit" disabled={!password || password.length < 4} on:click={handleSubmit}>{_("shared.enterPass")}</button>
</form>