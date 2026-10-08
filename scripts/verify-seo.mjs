#!/usr/bin/env node
/**
 * SEO / GEO smoke test.
 *
 * Verifies, against a running deployment, that the metadata, structured data,
 * hreflang cluster and AI-discovery endpoints are actually being served.
 *
 * Usage:
 *   node scripts/verify-seo.mjs                       # http://localhost:3000
 *   node scripts/verify-seo.mjs http://localhost:3123
 *   node scripts/verify-seo.mjs https://odoo.metaerp.ai
 */

const BASE = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '');
const SITE = 'https://odoo.metaerp.ai';

const LOCALES = ['en', 'zh', 'ja', 'es', 'ru'];
const HREFLANG = ['en', 'zh-Hans', 'ja', 'es', 'ru', 'x-default'];
const SCHEMA_TYPES = [
	'Organization',
	'WebSite',
	'WebPage',
	'SoftwareApplication',
	'SoftwareSourceCode',
	'FAQPage',
];

const failures = [];
let checks = 0;

function check(ok, label) {
	checks += 1;
	if (ok) {
		console.log(`  \u001b[32m✓\u001b[0m ${label}`);
	} else {
		console.log(`  \u001b[31m✗\u001b[0m ${label}`);
		failures.push(label);
	}
}

async function fetchText(path) {
	const res = await fetch(`${BASE}${path}`, { redirect: 'manual' });
	return { status: res.status, location: res.headers.get('location'), body: await res.text() };
}

const head = (html) => html.slice(0, html.indexOf('</head>'));
const matchAll = (re, text) => [...text.matchAll(re)].map((m) => m[1]);

function jsonLdBlocks(html) {
	return matchAll(/<script id="ld-[a-z]+" type="application\/ld\+json">([\s\S]*?)<\/script>/g, html).map(
		(body) => JSON.parse(body.replace(/\\u003c/g, '<')),
	);
}

console.log(`\nSEO/GEO verification against ${BASE}\n`);

for (const locale of LOCALES) {
	console.log(`/${locale}`);
	const { status, body } = await fetchText(`/${locale}`);
	const headHtml = head(body);

	check(status === 200, `200 OK (got ${status})`);
	check(
		new RegExp(`<html lang="(en|zh-Hans|ja|es|ru)"`).test(body),
		'<html lang> is server-rendered per locale',
	);
	check(/<title>[^<]{10,}<\/title>/.test(headHtml), 'localized title');
	check(/<meta name="description" content="[^"]{60,}"/.test(headHtml), 'localized description');
	check(
		matchAll(/<link rel="canonical" href="([^"]+)"/g, headHtml).join() === `${SITE}/${locale}`,
		'self-referencing canonical',
	);
	const langs = new Set(matchAll(/hrefLang="([^"]+)"/g, headHtml));
	check(HREFLANG.every((h) => langs.has(h)), 'complete hreflang cluster');
	check(!/name="robots" content="[^"]*noindex/.test(headHtml), 'indexable');

	const graphs = jsonLdBlocks(body).flatMap((data) => data['@graph'] || []);
	const types = new Set(graphs.map((node) => node['@type']));
	check(SCHEMA_TYPES.every((t) => types.has(t)), `structured data: ${SCHEMA_TYPES.join(', ')}`);
	const app = graphs.find((node) => node['@type'] === 'SoftwareApplication');
	check(Boolean(app?.offers?.length), 'SoftwareApplication has pricing offers');
	const faq = graphs.find((node) => node['@type'] === 'FAQPage');
	check((faq?.mainEntity?.length || 0) >= 7, `FAQPage questions (${faq?.mainEntity?.length || 0})`);

	check(body.includes('<nav aria-label="Footer"'), 'nav + footer links present without JS');
}

console.log('\ndiscovery endpoints');
const robots = await fetchText('/robots.txt');
check(robots.status === 200, '/robots.txt served');
check(robots.body.includes(`Sitemap: ${SITE}/sitemap.xml`), 'robots.txt declares the sitemap');
check(
	['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'].every((bot) => robots.body.includes(bot)),
	'robots.txt names answer-engine crawlers',
);

const sitemap = await fetchText('/sitemap.xml');
const locs = matchAll(/<loc>([^<]+)<\/loc>/g, sitemap.body);
check(
	LOCALES.every((l) => locs.includes(`${SITE}/${l}`)) && locs.length === LOCALES.length,
	`sitemap lists ${LOCALES.length} locale URLs`,
);
check(
	(sitemap.body.match(/<xhtml:link/g) || []).length === LOCALES.length * HREFLANG.length,
	'sitemap carries hreflang alternates',
);

const llms = await fetchText('/llms.txt');
check(llms.status === 200 && llms.body.startsWith('# '), '/llms.txt served');
check(llms.body.includes('## Key facts'), 'llms.txt exposes quotable product facts');
const llmsFull = await fetchText('/llms-full.txt');
check(llmsFull.status === 200 && llmsFull.body.includes('### FAQ'), '/llms-full.txt served');

console.log('\ncross-product promotion');
const WMS = 'https://wms.metaerp.ai/';
for (const locale of LOCALES) {
	const { body } = await fetchText(`/${locale}`);
	check(new RegExp(`<a[^>]+href="${WMS.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`).test(body), `/${locale} has a crawlable anchor to the WMS site`);
	const mentioned = jsonLdBlocks(body)
		.flatMap((data) => data['@graph'] || [])
		.some((node) => node.mentions?.some((m) => m.url === WMS));
	check(mentioned, `/${locale} JSON-LD mentions the WMS product`);
}

console.log('\ndownload assets');
const APK_HOST = 'dl.metaerp.ai';
for (const name of ['hms', 'gms']) {
	const res = await fetch(`${BASE}/qr/${name}.png`, { redirect: 'manual' });
	const type = res.headers.get('content-type') || '';
	check(res.status === 200 && type.startsWith('image/png'), `/qr/${name}.png served as PNG (got ${res.status} ${type})`);
	const decoded = Buffer.from(await res.arrayBuffer()).subarray(0, 8);
	check(decoded.toString('hex') === '89504e470d0a1a0a', `/qr/${name}.png is a real PNG file`);
}
const homeHtml = (await fetchText('/en')).body;
check(homeHtml.includes(APK_HOST), '/en links to the APK host, so the trigger works without JS');

console.log('\nnoindex / 404');
for (const path of ['/en/about', '/en/blog']) {
	const { body } = await fetchText(path);
	check(/name="robots" content="noindex, follow"/.test(body), `${path} is noindex,follow`);
}
const success = await fetchText('/en/payment-success');
check(/name="robots" content="noindex, nofollow"/.test(success.body), 'payment-success is noindex');
const notFound = await fetchText('/en/does-not-exist');
check(notFound.status === 404, 'unknown page returns 404');
const bogusAsset = await fetchText('/does-not-exist.txt');
check(bogusAsset.status === 404, 'unknown static-looking path returns 404, not the home page');

console.log('\nredirects');
for (const [from, to] of [
	['/', '/en'],
	['/zh-CN', '/zh'],
	['/fr', '/en'],
]) {
	const { status, location } = await fetchText(from);
	check(
		[301, 302, 307, 308].includes(status) && (location || '').endsWith(to),
		`${from} -> ${to} (got ${status} ${location || ''})`,
	);
}

console.log(
	`\n${checks - failures.length}/${checks} checks passed` +
		(failures.length ? `\n\nFailed:\n${failures.map((f) => `  - ${f}`).join('\n')}\n` : '\n'),
);

process.exit(failures.length ? 1 : 0);
