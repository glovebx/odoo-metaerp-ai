import '../globals.css';

import { Analytics } from '@vercel/analytics/react';
import { notFound } from 'next/navigation';
import { SiteConfig } from '@/lib/config/site';
import CustomHead from '@/components/common/head';
import HydrationBeacon from '@/components/common/hydrationBeacon';
import JsonLd from '@/components/common/JsonLd';
import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';
import { ThemeProvider } from '@/context/ThemeContext';
import { contentLocales, resolveLocale } from '@/lib/i18n';
import { buildSiteGraph } from '@/lib/seo/structuredData';
import {
	APP_NAME,
	ORG_NAME,
	SITE_URL,
	languageAlternates,
	localeMeta,
	localeUrl,
	metaTitle,
	ogImage,
	seoCopy,
} from '@/lib/seo/site';

const GOOGLE_SITE_VERIFICATION = 'UnzAE6EtauPb7XJJI75yBpmpLCUC1TRmIiU_M3Girn0';

/**
 * Pre-render every locale we ship instead of rendering on demand. This gives
 * crawlers static HTML with a correct `lang` attribute — LLM and answer-engine
 * crawlers generally do not execute JavaScript.
 */
export function generateStaticParams() {
	return contentLocales.map((lang) => ({ lang }));
}

/**
 * Localized metadata: per-language title/description/keywords, a self
 * referencing canonical, and the full hreflang cluster.
 */
export async function generateMetadata({ params }) {
	const { lang } = await params;
	const locale = resolveLocale(lang);
	const copy = seoCopy[locale];
	const meta = localeMeta[locale];

	const openGraphLocales = contentLocales
		.filter((other) => other !== locale)
		.map((other) => localeMeta[other].ogLocale);

	return {
		metadataBase: new URL(SITE_URL),
		title: {
			default: metaTitle(locale),
			template: `%s | ${APP_NAME}`,
		},
		description: copy.description,
		keywords: copy.keywords,
		applicationName: APP_NAME,
		authors: SiteConfig.authors,
		creator: SiteConfig.authors?.[0]?.name,
		publisher: ORG_NAME,
		category: 'Business Software',
		alternates: {
			canonical: localeUrl(locale),
			languages: languageAlternates(),
		},
		openGraph: {
			type: 'website',
			locale: meta.ogLocale,
			alternateLocale: openGraphLocales,
			url: localeUrl(locale),
			siteName: APP_NAME,
			title: metaTitle(locale),
			description: copy.description,
			images: [ogImage],
		},
		twitter: {
			card: 'summary_large_image',
			title: metaTitle(locale),
			description: copy.description,
			images: [ogImage.url],
		},
		icons: SiteConfig.icons,
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-image-preview': 'large',
				'max-snippet': -1,
				'max-video-preview': -1,
			},
		},
		verification: {
			google: GOOGLE_SITE_VERIFICATION,
		},
	};
}

export default async function LocaleLayout({ children, params }) {
	const { lang } = await params;

	// Reject unknown locales. A dynamic segment happily swallows almost
	// anything, so without this `/anything.txt` would render the home page
	// under a bogus locale — a duplicate-content hole — instead of a 404.
	if (!contentLocales.includes(lang)) notFound();

	const locale = resolveLocale(lang);
	const meta = localeMeta[locale];

	return (
		<html
			lang={meta.htmlLang}
			dir={meta.dir}
			suppressHydrationWarning
		>
			<head>
				<CustomHead />
			</head>
			<body>
				<ThemeProvider>
					<div className='w-full min-h-svh text-base-content bg-base-100'>
						<Navbar />
						<div className='px-5'>{children}</div>
						<Footer />
					</div>
				</ThemeProvider>
				<Analytics />
				{/* Cancels the no-hydration reveal failsafe armed in <head>. */}
				<HydrationBeacon />
				{/* Site-wide Organization + WebSite graph, shared by every locale. */}
				<JsonLd
					id='ld-site'
					data={buildSiteGraph()}
				/>
			</body>
		</html>
	);
}
