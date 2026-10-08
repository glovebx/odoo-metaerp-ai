import { buildLlmsTxt } from '@/lib/seo/llms';

// Served as /llms.txt — see https://llmstxt.org
export const dynamic = 'force-static';

export function GET() {
	return new Response(buildLlmsTxt(), {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
		},
	});
}
