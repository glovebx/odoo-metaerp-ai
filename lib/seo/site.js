import { SiteConfig, relatedProducts } from '@/lib/config/site';
import { contentLocales, defaultLocale, localeHrefLang } from '@/lib/i18n';

export const SITE_URL = (SiteConfig.url || 'https://odoo.metaerp.ai').replace(/\/$/, '');
export const APP_NAME = 'MetaERP Odoo Client';
export const GITHUB_REPO = 'https://github.com/glovebx/moco-odoo-client';
export const GITHUB_RELEASES = `${GITHUB_REPO}/releases`;
export const AUTHOR_URL = 'https://github.com/glovebx';
export const ORG_NAME = 'MetaERP.AI';
export const ORG_URL = 'https://metaerp.ai';
/** Sibling product cross-promoted from the hero. */
export const WMS_PRODUCT = relatedProducts.wms;

/**
 * Per-locale HTML/OG hints. Keys must exist in `contentLocales`; `hreflang` is
 * shared with the language switcher via `localeHrefLang`.
 */
export const localeMeta = {
	en: { htmlLang: 'en', ogLocale: 'en_US', hreflang: localeHrefLang.en, dir: 'ltr', label: 'English' },
	zh: { htmlLang: localeHrefLang.zh, ogLocale: 'zh_CN', hreflang: localeHrefLang.zh, dir: 'ltr', label: '简体中文' },
	ja: { htmlLang: localeHrefLang.ja, ogLocale: 'ja_JP', hreflang: localeHrefLang.ja, dir: 'ltr', label: '日本語' },
	es: { htmlLang: localeHrefLang.es, ogLocale: 'es_ES', hreflang: localeHrefLang.es, dir: 'ltr', label: 'Español' },
	ru: { htmlLang: localeHrefLang.ru, ogLocale: 'ru_RU', hreflang: localeHrefLang.ru, dir: 'ltr', label: 'Русский' },
};

/**
 * Localized, search-optimized <title>/<meta name="description"> copy.
 * Kept in one place so every locale page gets unique, keyword-bearing metadata
 * instead of the English defaults.
 */
export const seoCopy = {
	en: {
		title: 'Free Odoo Android & HarmonyOS Client App',
		description:
			'MetaERP Odoo Client is a free Odoo mobile client for Android and HarmonyOS: Odoo 17+ Community & Enterprise (plus v14 Enterprise), camera barcode scanning, Bluetooth receipt printing, PDA support and native push notifications.',
		keywords: [
			'odoo android app',
			'odoo mobile client',
			'odoo harmony app',
			'free odoo app',
			'odoo 19 client',
			'odoo community edition mobile',
			'odoo barcode scanning',
			'odoo pda',
			'open source odoo client',
			'erp android app',
		],
		alternateNames: ['Odoo Harmony/Android Client', 'moco-odoo-client', 'MetaERP Odoo Android App'],
		tagline: 'Run your whole Odoo business from your phone — free for individuals.',
	},
	zh: {
		title: '免费 Odoo 安卓/鸿蒙客户端 App',
		description:
			'MetaERP Odoo Client 是一款免费的 Odoo 移动客户端，支持安卓与鸿蒙系统，兼容 Odoo 17+ 社区版/企业版及 v14 企业版，支持摄像头扫码、蓝牙热敏打印、PDA 与安卓原生消息推送。',
		keywords: [
			'odoo 安卓客户端',
			'odoo 手机app',
			'odoo 鸿蒙',
			'免费的 odoo app',
			'odoo 19 客户端',
			'odoo 社区版 手机',
			'odoo 扫码',
			'odoo pda',
			'开源 odoo 客户端',
			'erp 安卓应用',
		],
		alternateNames: ['Odoo 鸿蒙/安卓客户端', 'moco-odoo-client', 'MetaERP Odoo 安卓版'],
		tagline: '随时随地用手机处理 Odoo 业务，个人使用完全免费。',
	},
	ja: {
		title: '無料 Odoo Android・HarmonyOS クライアント',
		description:
			'MetaERP Odoo Client は Android・HarmonyOS 対応の無料 Odoo モバイルクライアントです。Odoo 17 以降のコミュニティ版/エンタープライズ版（v14 エンタープライズ版含む）に対応し、カメラスキャン、Bluetooth レシート印刷、PDA、ネイティブプッシュ通知を利用できます。',
		keywords: [
			'odoo android アプリ',
			'odoo モバイル クライアント',
			'odoo harmonyos',
			'無料 odoo アプリ',
			'odoo 19 クライアント',
			'odoo コミュニティ版 スマホ',
			'odoo バーコード スキャン',
			'odoo pda',
		],
		alternateNames: ['Odoo Harmony/Android Client', 'moco-odoo-client', 'MetaERP Odoo クライアント'],
		tagline: 'Odoo の業務をスマホから。個人利用は完全無料。',
	},
	es: {
		title: 'Cliente Odoo gratis para Android y HarmonyOS',
		description:
			'MetaERP Odoo Client es un cliente móvil Odoo gratuito para Android y HarmonyOS: Odoo 17+ Community y Enterprise (además de v14 Enterprise), escaneo de códigos con cámara, impresión Bluetooth, soporte PDA y notificaciones push nativas.',
		keywords: [
			'app odoo android',
			'cliente odoo móvil',
			'odoo harmonyos',
			'app odoo gratis',
			'odoo 19 cliente',
			'odoo community edition móvil',
			'escanear códigos odoo',
			'odoo pda',
		],
		alternateNames: ['Odoo Harmony/Android Client', 'moco-odoo-client', 'MetaERP Odoo para Android'],
		tagline: 'Gestiona todo tu negocio en Odoo desde el móvil, gratis para uso personal.',
	},
	ru: {
		title: 'Бесплатный клиент Odoo для Android и HarmonyOS',
		description:
			'MetaERP Odoo Client — бесплатный мобильный клиент Odoo для Android и HarmonyOS: Odoo 17+ Community и Enterprise (а также v14 Enterprise), сканирование камерой, печать чеков по Bluetooth, поддержка PDA и нативные push-уведомления.',
		keywords: [
			'приложение odoo android',
			'мобильный клиент odoo',
			'odoo harmonyos',
			'бесплатное приложение odoo',
			'odoo 19 клиент',
			'odoo community edition мобильный',
			'odoo сканер штрихкодов',
			'odoo pda',
		],
		alternateNames: ['Odoo Harmony/Android Client', 'moco-odoo-client', 'MetaERP Odoo для Android'],
		tagline: 'Ведите бизнес в Odoo с телефона — для личного использования бесплатно.',
	},
};

export const ogImage = {
	url: `${SITE_URL}/og.png`,
	width: 2880,
	height: 1544,
	alt: 'MetaERP Odoo Client running on Android and HarmonyOS',
};

/** Pretty, keyword-bearing <title> for a locale. */
export function metaTitle(locale, pageTitle) {
	const copy = seoCopy[locale] || seoCopy[defaultLocale];
	if (!pageTitle) return `${copy.title} | ${APP_NAME}`;
	return `${pageTitle} | ${APP_NAME}`;
}

/** Absolute URL for a content page inside a locale, e.g. `https://…/zh`. */
export function localePath(locale, path = '') {
	const clean = String(path || '').replace(/^\/+|\/+$/g, '');
	return `/${locale}${clean ? `/${clean}` : ''}`;
}

export function localeUrl(locale, path = '') {
	return `${SITE_URL}${localePath(locale, path)}`;
}

/**
 * hreflang map for a given page path, suitable for both
 * `metadata.alternates.languages` and the sitemap `alternates.languages`.
 */
export function languageAlternates(path = '') {
	const languages = {};
	for (const locale of contentLocales) {
		languages[localeMeta[locale].hreflang] = localeUrl(locale, path);
	}
	// Serve the English page as the fallback for unmatched languages.
	languages['x-default'] = localeUrl(defaultLocale, path);
	return languages;
}

/** The locales + hrefs a language switcher / link rel=alternate should use. */
export function alternateLinks(path = '') {
	return contentLocales.map((locale) => ({
		locale,
		label: localeMeta[locale].label,
		href: localePath(locale, path),
		hrefLang: localeMeta[locale].hreflang,
	}));
}
