import { locales } from './lib/i18n';
import { NextRequest } from 'next/server';

export function proxy(request) {
	const { pathname } = request.nextUrl;

	const isLocalizedPath = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

    // --- 定义不需要被重定向的特定路径 ---
    // 将 这两个页面 添加到豁免列表
    const isExemptPath = (pathname === '/news.html' || pathname === '/privacy.html');

    // 如果路径已经包含 locale，或者它是我们豁免的路径，则直接放行
    if (isLocalizedPath || isExemptPath) {
        return;
    }

	request.nextUrl.pathname = `/`;
	return Response.redirect(request.nextUrl);
}

export const config = {
	matcher: ['/((?!_next)(?!.*\\.(?:ico|png|gif|svg|jpg|jpeg|xml|txt|mp4)$)(?!/api).*)'],
};