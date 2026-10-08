import { NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { locales, defaultLocale, resolveLocale } from '@/lib/i18n';

function getLocale(request) {
  const negotiatorHeaders = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // 🔑 关键修复：传入 locales 作为参数，限制 negotiator 只返回这些语言
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);
  // console.log('Negotiator languages:', languages);
  // console.log('Supported locales:', locales);

  // Canonicalize immediately: negotiating to e.g. `zh-CN` would otherwise cost
  // crawlers a second redirect hop (`/zh-CN` -> `/zh`) before they reach content.
  const locale = match(languages, locales, defaultLocale);
  return resolveLocale(locale);
}

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const pathnameParts = pathname.split('/').filter(Boolean);
  let localeInPath = pathnameParts[0]; // e.g., 'en-US', 'zh-CN', 'fr', or undefined
  const originalLocaleInPath = localeInPath; // Keep original for comparison

  // Canonicalize locale from path if it matches patterns
  if (localeInPath && localeInPath.startsWith('zh-')) {
    localeInPath = 'zh';
  } else if (localeInPath && localeInPath.startsWith('en-')) {
    localeInPath = 'en';
  }

  // Check if the (potentially canonicalized) locale is supported in our list
  const isCanonicalLocaleSupported = locales.includes(localeInPath);

  // Case 1: No locale in path, or the (canonicalized) locale is not supported
  if (!originalLocaleInPath || !isCanonicalLocaleSupported) {
    const browserLocale = getLocale(request); // Get locale based on browser prefs or default

    let newPathname;
    if (originalLocaleInPath) { // There was an unsupported locale in the path (e.g., /fr/page)
      newPathname = `/${browserLocale}/${pathnameParts.slice(1).join('/')}`;
    } else { // No locale in path (e.g., /page)
      newPathname = `/${browserLocale}${pathname}`;
    }
    request.nextUrl.pathname = newPathname;

    const response = NextResponse.redirect(request.nextUrl);
    // The target depends on Accept-Language, so caches must key on it —
    // otherwise one visitor's negotiated redirect is served to everyone
    // (and to search engine crawlers).
    response.headers.set('Vary', 'Accept-Language');
    return response;
  }

  // Case 2: A specific locale (e.g., 'zh-CN', 'en-US') was in the path,
  // and it was canonicalized to a different but supported base locale (e.g., 'zh', 'en').
  // We should redirect to the canonical base locale.
  if (originalLocaleInPath !== localeInPath) {
    const newPathname = `/${localeInPath}/${pathnameParts.slice(1).join('/')}`;
    request.nextUrl.pathname = newPathname;
    return NextResponse.redirect(request.nextUrl);
  }

  // Case 3: The locale in the path is already canonical and supported (e.g., 'zh', 'en', 'ja').
  // In this case, let the request proceed without redirection.
  return;
}

export const config = {
  // Match only internationalized pathnames.
  //
  // Anything with a file extension is skipped, which keeps static SEO/GEO
  // assets reachable at the site root (`/robots.txt`, `/sitemap.xml`,
  // `/llms.txt`, `/llms-full.txt`, `/og.png`, the Google verification HTML
  // file, ...) instead of being rewritten to `/{locale}/...` and 404ing.
  matcher: [
    '/((?!api|_next|@vite|.*\\..*).*)',
  ],
};
