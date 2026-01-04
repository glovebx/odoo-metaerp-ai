import { locales } from './lib/i18n';
import { NextRequest } from 'next/server';

const exemptPathsSet = new Set(['/news.html', '/privacy.html', '/terms.html']);
export function proxy(request) {
	const { pathname } = request.nextUrl;

	const isLocalizedPath = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

    // --- 定义不需要被重定向的特定路径 ---
    // 将 页面 添加到豁免列表
    const isExemptPath = exemptPathsSet.has(pathname);

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