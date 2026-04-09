
import _ from "lodash"

export function extractTierId(str) {
  const match = str.match(/TIER (\d+)/);
  return match ? match[1] : null;
}

export function parseMacro(values) {
	const data = []

	values.splice(0, 1) // remove header row
	values.forEach(([ nameId, desc ]) => {
		if (!nameId) return

		const [ id, macroName ] = nameId.split(' - ')
		data.push({ id: id, fullId: 'mt-' +id, name: macroName, desc, segment: "macro", segmentGroup: "macro" })
	})


	return data
}

export function parseTerritories(values) {
	const data = []

	values.splice(0, 1) // remove header row
	values.forEach(([ macro, territory, desc, activates, claims, trends, folderName ]) => {
		if (!macro || !territory) return

		const [ id, name ] = territory.split(' - ')
		
		data.push({
			id,
			fullId: 'tr-' + id,
			macroId: macro.split(' - ')[0],
			name,
			desc,
			activates,
			trends: trends ? trends.split(',').map(d => d.trim()) : [],
			claims: claims ? claims.split(',').map(d => d.trim()) : [],
			segment: "territory",
			segmentGroup: "territories"
		})
	})


	return data
}


export function parseTerritoryMoodobards(values) {
	const data = []

	values.splice(0, 1) // remove header row
	values.forEach(([ territory, img, imgMimeType, imgURL, imgID ]) => {
		if (!territory || !imgMimeType || !imgID) return

		const territoryId = territory.split(' - ')[0]

		data.push({
			territoryId,
			img: makeImageObject(imgID, imgMimeType),
		})
	})

	return data
}

export function parseTiers(values) {
	const data = []

	values.splice(0, 1) // remove header row
	values.forEach(([ id, name ]) => {
		if (!id || !name) return
		

		data.push({ id, name, segment: "tier", segmentGroup: "tiers" })
	})



	return data
}

function makeImageObject(id, mimeType) {
	if (mimeType.startsWith('image')) {
		return { valid: true, id, mimeType, format: mimeType.split('/')[1] }
	}
	return { valid: false }
}

export function parseBrands(values) {
	const data = []

	values.splice(0, 1) // remove header row
	values.forEach(([ brand, type, about, role, bci, img, imgMimeType, imgURL, imgID, explanationMacro, territory, tier ]) => {
		if (!brand || !territory || !tier) return

		const id = _.kebabCase(brand)
		const territoryId = territory.split(' - ')[0]

		const tierId = extractTierId(tier)

		data.push({
			fullId: 'br-' + id,
			id,
			territoryId,
			tierId,
			territoryTierId: territoryId + '-' + tierId,
			name: brand,
			type,
			desc: about,
			role,
			bci,
			img: makeImageObject(imgID, imgMimeType),
			explanationMacro: explanationMacro, 
			segment: "brand",
			segmentGroup: "brands"
		})
	})



	return data
}

export function parseProducts(values) {
	const data = []

	values.splice(0, 1) // remove header row
	values.forEach(([ name, format, brand, brandArchitecture, desc, claims, img, imgMimeType, imgURL, imgID, territory, tier ]) => {
		if (!name || !brand || !territory || !tier) return
		
		const id = _.kebabCase(format) + '.' + _.kebabCase(name)
		const brandId = _.kebabCase(brand)
		const territoryId = territory.split(' - ')[0]

		const tierId = extractTierId(tier)

		data.push({
			fullId: 'pr-' + id,
			id,
			territoryId,
			tierId,
			territoryTierId: territoryId + '-' + tierId,
			brandId,
			name,
			format,
			brandArchitecture,
			isCore: brandArchitecture === 'Core Product',
			desc: desc,
			claims: claims ? claims.split(',').map(d => d.trim()) : [],
			img: makeImageObject(imgID, imgMimeType),
			segment: "product",
			segmentGroup: "products"
		})
	})



	return data
}

export function parseInputProducts(row) {
	const [ id, name, format, brandId, brandArchitecture, desc, claims, territoryId, tierId, imgID, imgMimeType ] = row

	return {
		fullId: 'pr-' + id,
		id,
		territoryId,
		tierId,
		territoryTierId: territoryId + '-' + tierId,
		brandId,
		name,
		format,
		brandArchitecture,
		isCore: brandArchitecture === 'Core Product',
		desc,
		claims: claims ? JSON.parse(claims) : [],
		img: makeImageObject(imgID, imgMimeType),
		segment: "product",
		segmentGroup: "products"
	}
}


export function parseProductClaims(values) {
	return values.map(([ macro, name ], i) => ({ macroId: macro.split(' - ')[0], id: i.toString(), name }))
}