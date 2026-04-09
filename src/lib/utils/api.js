// Google APIs removed — app runs in local/template mode
export const imageMetadata = {}
export const imageFolders = {}

export async function authenticate() {
	return Response.json({ success: true })
}

export function getImageMetadata() { return null }
export function getFolderImages() { return null }
