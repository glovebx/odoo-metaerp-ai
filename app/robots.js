import { SITE_URL } from '@/lib/seo/site';

export const dynamic = 'force-static';

/**
 * Crawlers used by answer engines / LLM products. They are allowed by the `*`
 * group already, but naming them explicitly keeps the intent documented and
 * survives a future blanket tightening of the wildcard group.
 * @see https://llmstxt.org
 */
const ANSWER_ENGINE_BOTS = [
	'GPTBot',
	'OAI-SearchBot',
	'ChatGPT-User',
	'ClaudeBot',
	'Claude-User',
	'Claude-SearchBot',
	'anthropic-ai',
	'PerplexityBot',
	'Perplexity-User',
	'Google-Extended',
	'Googlebot',
	'Bingbot',
	'Applebot',
	'Applebot-Extended',
	'Amazonbot',
	'DuckAssistBot',
	'meta-externalagent',
	'Bytespider',
	'PetalBot',
	'cohere-ai',
	'YouBot',
	'CCBot',
	'Diffbot',
	'ImagesiftBot',
	'Timpibot',
	'omgili',
	'omgilibot',
];

const DISALLOW = ['/api/', '/payment-success'];

export default function robots() {
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: DISALLOW,
			},
			{
				userAgent: ANSWER_ENGINE_BOTS,
				allow: '/',
				disallow: DISALLOW,
			},
		],
		sitemap: `${SITE_URL}/sitemap.xml`,
		host: SITE_URL,
	};
}
