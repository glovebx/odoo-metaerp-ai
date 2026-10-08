'use client';
import { usePathname } from 'next/navigation';
import { contentLocales, localeFromPathname, localeHrefLang, localeNames } from '@/lib/i18n';

/**
 * Language switcher.
 *
 * Renders real `<a href hreflang>` links instead of JS-only handlers so
 * crawlers can discover the localized versions of the current page straight
 * from the markup, and so the control works without JavaScript.
 */
export default function LangSwitch() {
	const pathname = usePathname();
	const langName = localeFromPathname(pathname);

	// Everything after the locale segment, e.g. `/zh/pricing` -> `pricing`.
	const rest = String(pathname || '')
		.split('/')
		.filter(Boolean)
		.slice(1)
		.join('/');

	const hrefFor = (locale) => `/${locale}${rest ? `/${rest}` : ''}`;
	const currentName = localeNames[langName] || localeNames.en;

	return (
		<div className='dropdown dropdown-end dropdown-hover z-100'>
			<div
				tabIndex={0}
				role='button'
				aria-label={`Language: ${currentName}. Change language`}
				className='flex items-center justify-center cursor-pointer md:bg-base-100 md:rounded-full w-5 md:w-20 h-5 text-sm md:h-8 md:shadow-sm md:hover:shadow-md transition-all'
			>
				{/* 国旗部分 - 始终显示 */}
				<span className='flag'>{currentName.split(' ')[0]}</span>

				{/* 国名部分 - 仅在中等屏幕及以上显示 */}
				<span className='hidden md:inline ml-1'>{currentName.split(' ').slice(1).join(' ')}</span>
			</div>
			<ul
				tabIndex={0}
				className='dropdown-content menu bg-base-100 rounded-box z-1 w-40 p-2 shadow'
			>
				{contentLocales.map((key) => {
					const name = localeNames[key] || key;
					return (
						<li key={key}>
							<a
								href={hrefFor(key)}
								hrefLang={localeHrefLang[key]}
								aria-current={key === langName ? 'true' : undefined}
								title={`switch to ${name}`}
							>
								{name}
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
