<script>
  import { afterUpdate, onMount } from 'svelte';
  import Spinner from './Spinner.svelte';

  export let image = { valid: false }
  export let width = false
  export let height = "2rem"
  export let alt = ''

  let mounted = false

  let src 
  let loading = true
  let error = false
  let errorMessage = ''

  onMount(() => {
    mounted = true
  })

  $: mounted && image && fetchImage(image)

  async function fetchImage(image) {
    src = undefined
    loading = true
    error = false
    errorMessage = ''

    try {
      if (image.src) {
        src = image.src
        return
      }

      if (!image.valid) {
        errorMessage = 'No image source was provided'
        throw new Error(`Image data is missing or incorrect format`)
      }

      const response = await fetch('api/image?id=' + image.id + '&format=' + image.format)
      
      if (!response.ok) {
        errorMessage = 'Failed to fetch image'
        console.error("Failed to fetch image", {
          url: response.url,
          status: response.status,
          statusText: response.statusText,
        })
        throw new Error(`Image fetch failed with status ${response.status}`)
      }

      const blob = await response.blob()
      src = URL.createObjectURL(blob)
    } 

    catch (err) {
      console.error('Error fetching image:', err);
      errorMessage = errorMessage || 'An unknown error occurred while fetching the image.';
      error = true;
    }

    finally {
      loading = false
    }
  }

</script>

{#key image.valid && image.id}
{#if loading}
  <div style:height style:width>
    <Spinner/>
  </div>
{:else if error}
  <div style:height style:width class="flex justify-center items-center px-1">
    <p class="m-0 p-0 text-xs italic text-center leading-tight">{errorMessage}</p>
  </div>
{:else}
  <!-- Display image when loaded successfully -->
  <img style:width style:height {src} {alt} class="object-contain" />
{/if}
{/key}