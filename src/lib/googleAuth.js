// Google authentication removed — app runs in local/template mode
export const authClient = null
export const sheetsClient = null
export const gdriveClient = null

export async function authenticate() {
	return { sheetsClient: null, gdriveClient: null }
}
