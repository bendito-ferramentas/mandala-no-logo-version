<script>
  import { entry, productClaims } from "$lib/stores";
  import { _ } from "$lib/utils/locale";
  import { fly } from "svelte/transition";
  import clickOutside from "$lib/actions/clickOutside";
	import { onMount } from "svelte";

  export let isOpen

  let selected = []
  let searchInput
  let newClaims = [] 


  function save() {
    entry.update(e => ({ ...e, claims: [...e.claims, ...selected] }))
    close()
  }

  function getOptions(allClaims, entryClaims, searchInput) {
    // Exclude claims that are already in the entry
    const filteredClaims = allClaims
      .filter(c => entryClaims.indexOf(c.name) === -1)
      .map(c => ({ 
        name: c.name, 
        hidden: searchInput && !c.name.toLowerCase().includes(searchInput.toLowerCase()) 
      }));

    // Add new claims that were added dynamically
    newClaims.forEach(newClaim => {
      if (!filteredClaims.some(c => c.name === newClaim)) {
        filteredClaims.splice(0, 0, { name: newClaim, hidden: false })
      }
    })

    // Add search input as a new option only if it's not already in the list
    if (searchInput && 
        !allClaims.some(c => c.name.toLowerCase() === searchInput.toLowerCase()) && 
        !newClaims.includes(searchInput)) 
    {
      filteredClaims.push({ name: searchInput, hidden: false });
    }

    // Ensure that selected claims are always visible when no search input is provided
    if (!searchInput) {
      selected.forEach(selectedClaim => {
        if (!filteredClaims.some(c => c.name === selectedClaim)) {
          filteredClaims.splice(0, 0, { name: selectedClaim, hidden: false });
        }
      });
    }

    return filteredClaims;
  }

  function handleSelect(claimName) {
    // If it's a new claim, add it to the newClaims list
    if (!newClaims.includes(claimName)) {
      newClaims.push(claimName);
    }

    searchInput = ''
  }

  function close() {
    isOpen = false
    selected = []
    searchInput = ''
    newClaims = []
  }
</script>


{#if isOpen}
<aside use:clickOutside={close} class="absolute p-4 bg-white rounded-xl shadow z-10 flex flex-col gap-4" transition:fly={{ y: 24, opacity: 0 }}>
  <input class="search-input" placeholder={_('quiz.searchClaim')} bind:value={searchInput}>
  <div class="w-96 h-64 overflow-x-hidden overflow-y-auto flex flex-col">
    <ul class="grid grid-flow-row gap-2 pr-2 py-1.5">
      {#each getOptions($productClaims, $entry.claims, searchInput) as claim (claim.name)}
        <li class="w-full {claim.hidden ? 'hidden' : ''}" title={claim.name}>
          <input
            id={claim.name} 
            class="checkbox" 
            type="checkbox" 
            value={claim.name} 
            bind:group={selected} 
            on:change={() => handleSelect(claim.name)}
          />
          <label class="block w-full overflow-hidden" for={claim.name}>{claim.name}</label>
        </li>
      {/each}
    </ul>
  </div>
  <button class="btn btn--primary" disabled={!selected || selected.length == 0} on:click={save}>{_('shared.save')}</button>
</aside>
{/if}

