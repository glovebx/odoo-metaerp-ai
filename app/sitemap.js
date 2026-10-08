import { contentLocales } from '@/lib/i18n';
import { languageAlternates, localeUrl } from '@/lib/seo/site';

export const dynamic = 'force-static';

/**
 * One entry per localized landing page, each carrying the full hreflang
 * alternate set so search engines discover the language cluster from the
 * sitemap alone. Only pages that actually have content are listed: the empty
 * `/about` and `/blog` stubs and the post-checkout `/payment-success` page are
 * noindex, so they are intentionally excluded.
 */
export default function sitemap() {
	const lastModified = new Date();
	const languages = languageAlternates();

	return contentLocales.map((locale) => ({
		url: localeUrl(locale),
		lastModified,
		changeFrequency: 'weekly',
		priority: locale === 'en' ? 1 : 0.9,
		alternates: { languages },
	}));
}
