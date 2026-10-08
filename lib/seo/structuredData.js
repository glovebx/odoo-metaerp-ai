import { downloads } from '@/lib/config/site';
import { FAQList } from '@/lib/faqsList';
import { FeaturesList } from '@/lib/featuresList';
import { PricingList } from '@/lib/pricingList';
import { defaultLocale } from '@/lib/i18n';
import {
	APP_NAME,
	AUTHOR_URL,
	GITHUB_REPO,
	ORG_NAME,
	ORG_URL,
	SITE_URL,
	WMS_PRODUCT,
	localeMeta,
	localeUrl,
	ogImage,
	seoCopy,
} from '@/lib/seo/site';

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Serialize a plain object into a schema.org JSON-LD graph. */
export function jsonLdScript(graph) {
	return {
		'@context': 'https://schema.org',
		'@graph': graph.filter(Boolean),
	};
}

/**
 * Site-wide graph: the publisher and the website itself.
 * Rendered once from the locale layout.
 */
export function buildSiteGraph() {
	const languages = Object.values(localeMeta).map((meta) => meta.htmlLang);

	return jsonLdScript([
		{
			'@type': 'Organization',
			'@id': ORG_ID,
			name: ORG_NAME,
			alternateName: 'MetaERP',
			url: ORG_URL,
			logo: {
				'@type': 'ImageObject',
				url: `${SITE_URL}/odoo.png`,
				width: 192,
				height: 192,
			},
			// Only verifiable profiles we actually own.
			sameAs: [GITHUB_REPO, AUTHOR_URL, ORG_URL],
		},
		{
			'@type': 'WebSite',
			'@id': WEBSITE_ID,
			name: APP_NAME,
			url: SITE_URL,
			description: seoCopy[defaultLocale].description,
			inLanguage: languages,
			publisher: { '@id': ORG_ID },
		},
	]);
}

function normalizeKey(value) {
	return String(value || '').toUpperCase().replace(/-/g, '_');
}

function pick(list, prefix, locale) {
	return list[`${prefix}_${normalizeKey(locale)}`] || [];
}

function parsePrice(price) {
	const value = Number.parseFloat(String(price ?? '').replace(/[^0-9.]/g, ''));
	return Number.isFinite(value) ? value : 0;
}

function priceSpecification(price, currency = 'USD') {
	return {
		'@type': 'UnitPriceSpecification',
		price: String(price),
		priceCurrency: currency,
		billingDuration: 'P1M',
		billingIncrement: 1,
	};
}

function buildOffers(locale) {
	const tiers = pick(PricingList, 'PRICING', locale);
	const url = localeUrl(locale);
	const currency = 'USD';

	return tiers.map((tier) => {
		const price = parsePrice(tier.price);
		return {
			'@type': 'Offer',
			name: tier.title,
			description: [tier.description, ...(tier.features || [])].filter(Boolean).join('. '),
			url,
			priceCurrency: currency,
			price: String(price),
			availability: 'https://schema.org/InStock',
			priceSpecification: priceSpecification(price, currency),
		};
	});
}

function buildFaqPage(locale) {
	const faqs = pick(FAQList, 'FAQ', locale);
	if (!faqs.length) return null;

	return {
		'@type': 'FAQPage',
		'@id': `${localeUrl(locale)}#faq`,
		inLanguage: localeMeta[locale].htmlLang,
		mainEntity: faqs.map((item) => ({
			'@type': 'Question',
			name: item.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.answer,
			},
		})),
	};
}

/**
 * Home page graph: the app itself, its pricing, its source code and the FAQ.
 * This is the part that answer engines (ChatGPT, Perplexity, Google AI
 * Overviews) are most likely to quote.
 *
 * `wms` is the localized 奥道 WMS copy shown in the hero announcement, so the
 * cross-promoted product is described identically in the markup and on screen.
 */
export function buildHomeGraph(locale, wms = {}) {
	const resolved = seoCopy[locale] ? locale : defaultLocale;
	const copy = seoCopy[resolved];
	const meta = localeMeta[resolved];
	const url = localeUrl(resolved);
	const appId = `${url}#software`;
	const features = pick(FeaturesList, 'FRETURES', resolved);

	return jsonLdScript([
		{
			'@type': 'WebPage',
			'@id': `${url}#webpage`,
			url,
			name: copy.title,
			description: copy.description,
			inLanguage: meta.htmlLang,
			isPartOf: { '@id': WEBSITE_ID },
			about: { '@id': appId },
			primaryImageOfPage: {
				'@type': 'ImageObject',
				url: ogImage.url,
				width: ogImage.width,
				height: ogImage.height,
			},
			mentions: [
				{
					'@type': 'SoftwareApplication',
					'@id': `${WMS_PRODUCT.url}#software`,
					name: WMS_PRODUCT.name,
					alternateName: WMS_PRODUCT.alternateName,
					description: wms.description,
					url: WMS_PRODUCT.url,
					applicationCategory: 'BusinessApplication',
					applicationSubCategory: 'Warehouse execution system for Odoo',
					operatingSystem: 'Android',
					inLanguage: meta.htmlLang,
					author: { '@id': ORG_ID },
				},
			],
			publisher: { '@id': ORG_ID },
		},
		{
			'@type': 'SoftwareApplication',
			'@id': appId,
			name: APP_NAME,
			alternateName: copy.alternateNames,
			description: copy.description,
			url,
			applicationCategory: 'BusinessApplication',
			applicationSubCategory: 'ERP mobile client for Odoo',
			operatingSystem: 'Android, HarmonyOS',
			inLanguage: meta.htmlLang,
			// Two signed builds: HMS for Huawei/Honor, GMS for Google-backed
			// Android. Both are listed because schema.org allows multiple values.
			downloadUrl: [downloads.hms.url, downloads.gms.url],
			installUrl: [downloads.hms.url, downloads.gms.url],
			screenshot: ogImage.url,
			isAccessibleForFree: true,
			featureList: features.map((feature) => `${feature.title}: ${feature.description}`),
			author: { '@id': ORG_ID },
			publisher: { '@id': ORG_ID },
			offers: buildOffers(resolved),
		},
		{
			'@type': 'SoftwareSourceCode',
			'@id': `${GITHUB_REPO}#source`,
			name: 'moco-odoo-client',
			url: GITHUB_REPO,
			codeRepository: GITHUB_REPO,
			programmingLanguage: ['Kotlin', 'Java'],
			runtimePlatform: 'Android',
			targetProduct: { '@id': appId },
			author: { '@id': ORG_ID },
		},
		buildFaqPage(resolved),
	]);
}
