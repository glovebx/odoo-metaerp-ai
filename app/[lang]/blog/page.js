import { resolveLocale } from '@/lib/i18n';
import { localeUrl } from '@/lib/seo/site';

/**
 * Placeholder page: it has no content yet, so it is kept out of the index
 * (thin/empty pages dilute site quality signals) and out of the sitemap.
 * Flip `index` back to true once real posts ship here.
 */
export async function generateMetadata({ params }) {
	const { lang } = await params;
	const locale = resolveLocale(lang);

	return {
		title: 'Blog',
		alternates: { canonical: localeUrl(locale, 'blog') },
		robots: { index: false, follow: true },
	};
}

export default function Blog() {
	return <></>;
}
