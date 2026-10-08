import './globals.css';

import Link from 'next/link';
import CustomHead from '@/components/common/head';
import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';
import { ThemeProvider } from '@/context/ThemeContext';
import { APP_NAME, alternateLinks } from '@/lib/seo/site';

// Next already emits `noindex` for not-found documents, so only the title is
// declared here to avoid duplicate robots meta tags.
export const metadata = {
	title: `Page not found | ${APP_NAME}`,
};

/**
 * Global 404 document.
 *
 * The root layout lives under `app/[lang]/`, so an unmatched URL has no layout
 * to inherit. `global-not-found` is Next's hook for exactly that case: it
 * renders a complete document, which lets us keep the navbar/footer and offer a
 * way back into the site in every language instead of showing a dead end.
 *
 * The `lang` attribute is corrected on the client from the URL, because a
 * global 404 does not know which locale was requested.
 */
export default function GlobalNotFound() {
	const links = alternateLinks();

	return (
		<html
			lang='en'
			suppressHydrationWarning
		>
			<head>
				<CustomHead />
				<script
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{
						__html: `(function(){try{var p=location.pathname.split('/').filter(Boolean)[0];var m={en:'en',zh:'zh-Hans',ja:'ja',es:'es',ru:'ru'};if(m[p]){document.documentElement.lang=m[p];}}catch(e){}})();`,
					}}
				/>
			</head>
			<body>
				<ThemeProvider>
					<div className='w-full min-h-svh text-base-content bg-base-100'>
						<Navbar />
						<div className='px-5'>
							<div className='max-w-[720px] mx-auto py-20 text-center'>
								<p className='text-6xl md:text-8xl font-bold bg-linear-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent'>
									404
								</p>
								<h1 className='mt-6 text-2xl md:text-3xl font-bold'>This page could not be found.</h1>
								<p className='mt-4 text-base-content/80'>
									The link may be broken, or the page may have been moved. Continue from the home page in your
									language:
								</p>

								<nav
									aria-label='Language home pages'
									className='mt-8 flex flex-wrap justify-center gap-3'
								>
									{links.map((link) => (
										<Link
											key={link.locale}
											href={link.href}
											hrefLang={link.hrefLang}
											className='btn btn-sm btn-outline rounded-full'
										>
											{link.label}
										</Link>
									))}
								</nav>
							</div>
						</div>
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
