import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

// export const locales = ['', 'en', 'en-US', 'zh', 'zh-CN', 'zh-TW', 'zh-HK', 'ja', 'ar', 'es', 'ru', "fr"];
export const locales = ['en', 'en-US', 'zh', 'zh-CN', 'zh-TW', 'zh-HK', 'ja', 'es', 'ru'];
export const localeNames = {
	en: '🇺🇸 English',
	zh: '🇨🇳 中文',
	ja: '🇯🇵 日本語',
	// ar: '🇸🇦 العربية',
	es: '🇪🇸 Español',
	ru: '🇷🇺 Русский',
	// fr: '🇫🇷 Français',
};
export const defaultLocale = 'en';

// Locales that actually ship translated page content (and a dictionary).
// The other entries in `locales` only exist for browser-preference negotiation.
export const contentLocales = ['en', 'zh', 'ja', 'es', 'ru'];

/**
 * BCP-47 tag advertised for each content locale, used for both the `hreflang`
 * cluster and the language switcher links so they never disagree.
 */
export const localeHrefLang = {
	en: 'en',
	zh: 'zh-Hans',
	ja: 'ja',
	es: 'es',
	ru: 'ru',
};

/**
 * Map any locale-ish input (`zh-CN`, `en-US`, `fr`, ...) onto a locale we
 * actually ship, falling back to `defaultLocale`.
 */
export function resolveLocale(locale) {
	if (!locale || typeof locale !== 'string') return defaultLocale;

	const normalized = locale.trim();
	if (['zh-CN', 'zh-TW', 'zh-HK', 'zh-Hans', 'zh-Hant'].includes(normalized)) return 'zh';
	if (normalized.startsWith('en')) return 'en';

	return contentLocales.includes(normalized) ? normalized : defaultLocale;
}

/**
 * Derive the active locale from a URL pathname such as `/zh/pricing`.
 *
 * Safe with `null`/`undefined` (Next hands back `null` from `usePathname()` in
 * some not-found render paths) and always returns a real locale, so a stray
 * segment can never crash a component that indexes `localeNames`/`NavLinksList`.
 */
export function localeFromPathname(pathname) {
	const segment = String(pathname || '/')
		.split('/')
		.filter(Boolean)[0];

	return resolveLocale(segment);
}

// If you wish to automatically redirect users to a URL that matches their browser's language setting,
// you can use the `getLocale` to get the browser's language.
export function getLocale(headers) {
	let languages = new Negotiator({ headers }).languages();

	return match(languages, locales, defaultLocale);
}

const dictionaries = {
	en: () => import('@/locales/en.json').then((module) => module.default),
	zh: () => import('@/locales/zh.json').then((module) => module.default),
	ja: () => import('@/locales/ja.json').then((module) => module.default),
	// ar: () => import('@/locales/ar.json').then((module) => module.default),
	es: () => import('@/locales/es.json').then((module) => module.default),
	ru: () => import('@/locales/ru.json').then((module) => module.default),
	// fr: () => import('@/locales/fr.json').then((module) => module.default),
};

export const getDictionary = async (locale) => {
	locale = resolveLocale(locale);

	if (!Object.keys(dictionaries).includes(locale)) {
		locale = 'en';
	}

	return dictionaries[locale]();
};
