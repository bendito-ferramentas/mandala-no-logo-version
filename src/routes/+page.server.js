import seed from '$lib/data/seed.json'

export async function load() {
	return { status: 'success', body: { data: seed } }
}
