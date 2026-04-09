import { json } from '@sveltejs/kit'

export async function POST({ request }) {
	const formData = await request.formData()
	const values = JSON.parse(formData.get('sheetValues'))

	// Template mode: no persistence, return mock response with a generated ID
	const row = values[0]
	row.push('FALSE') // imgID placeholder
	row.push('FALSE') // imgMimeType placeholder

	return json(row)
}
