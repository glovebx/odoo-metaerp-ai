import { buildLlmsFullTxt } from '@/lib/seo/llms';

// Served as /llms-full.txt — expanded, language-by-language content for LLMs.
export const dynamic = 'force-static';

export function GET() {
	return new Response(buildLlmsFullTxt(), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
		},
	});
}
