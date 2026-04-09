import * as d3 from "d3"

import { get, writable, derived, readable } from "svelte/store";

// Static
export const macro = writable()
export const territories = writable()
export const tiers = writable()
export const productTypes = writable()
export const brandArchitectures = writable()
export const productClaims = writable()
export const brands = writable()

// Dynamic
export const products = writable()
export const inputProducts = writable()

export const filters = writable({ brandIds: [], productFormats: [], brandArchitectures: [] })
export const nTiers = readable(4)



export const data = derived(
  [ macro, territories, tiers, brands, products, inputProducts ],
  ([ $macro, $territories, $tiers, $brands, $products, $inputProducts ]) => {
    if (!$macro || !$territories || !$tiers || !$brands || !$products || !$inputProducts) return false

    const macroNodes = $macro.map(macroNode => ({
      ...macroNode,
      territoryIds: $territories.filter(territory => territory.macroId == macroNode.id).map(territory => territory.id),
      tierIds: $tiers.map(tier => tier.id)
    }))

    const territoryTierNodes = []
    $territories.forEach(territoryNode => {
      $tiers.forEach(tierNode => {
        const id = territoryNode.id + '-' + tierNode.id
        territoryTierNodes.push({
          fullId: 'tr-' + id,
          id,
          territoryId: territoryNode.id,
          tierId: tierNode.id,
        })
      })
    })

    const territoryNodes = $territories.map(territoryNode => ({
      ...territoryNode,
      territoryTierIds: territoryTierNodes.filter(territoryTierNode => territoryTierNode.territoryId == territoryNode.id).map(territoryTierNode => territoryTierNode.id),
    }))

    const brandNodes = $brands.map(brandNode => {
      const macroId = territoryNodes.find(territoryNode => territoryNode.id == brandNode.territoryId).macroId
      return {
        ...brandNode,
        macroId,
        productIds: [...$products, ...$inputProducts].filter(product => product.brandId == brandNode.id).map(product => product.id)
      }
    })

    const productNodes = [...$products, ...$inputProducts].map(productNode => {
      const macroId = territoryNodes.find(territoryNode => territoryNode.id == productNode.territoryId).macroId
      return {
        ...productNode,
        macroId
      }
    })

    d3.rollup(productNodes, arr => {
      const territoryTierId = arr[0].territoryTierId
      const territoryTier = territoryTierNodes.find(d => d.id === territoryTierId)
      territoryTier.productIds = arr.map(d => d.id)
    }, d => d.territoryTierId)

    d3.rollup(productNodes, arr => {
      const territoryId = arr[0].territoryId
      const territory = territoryNodes.find(d => d.id === territoryId)
      territory.productIds = arr.map(d => d.id)
    }, d => d.territoryId)


    return {
      macro: macroNodes,
      tiers: $tiers,
      territoryTiers: territoryTierNodes,
      territories: territoryNodes,
      brands: brandNodes,
      products: productNodes
    }
  })
