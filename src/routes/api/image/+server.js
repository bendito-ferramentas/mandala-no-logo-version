// Template mode: no Google Drive — return a neutral SVG placeholder for any image request
export async function GET() {
	const svg = `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#E8E4DE"/>
  <rect x="70" y="60" width="60" height="50" rx="4" fill="#C8C2BA"/>
  <circle cx="85" cy="78" r="8" fill="#D8D2CA"/>
  <path d="M70 100 L95 80 L120 100 L130 110 H70 Z" fill="#C0BAB2"/>
  <rect x="80" y="130" width="40" height="5" rx="2.5" fill="#C8C2BA"/>
  <rect x="88" y="142" width="24" height="4" rx="2" fill="#D0CAC2"/>
</svg>`

	return new Response(svg, {
		headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'max-age=86400' }
	})
}
