'use client';
import Image from 'next/image';
import { NavLinksList } from '@/lib/navLinksList';
import { usePathname } from 'next/navigation';
import { localeFromPathname } from '@/lib/i18n';

const isExternal = (url) => url.substr(0, 4) === 'http';

export default function Footer() {
	// Derived during render (not inside an effect) so the footer links are part
	// of the server-rendered HTML and stay crawlable without JavaScript.
	const langName = localeFromPathname(usePathname());
	const linkList = NavLinksList[`LINK_${langName.toUpperCase()}`] || [];

	return (
		<footer className='w-full px-5 py-10 bg-[#202020] text-[#f7f7f7] '>
			<div className='max-w-[1024px] mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-2 text-sm'>
				<div className='flex flex-col items-center md:items-start'>
					<a
						aria-label='metaerp odoo client'
						className='flex items-center mb-3'
						title='metaerp odoo client'
						href={`/${langName}`}
					>
						<Image
							width={200}
							height={200}
							src={'/odoo.png'}
							className='transition-all hover:scale-110 w-6 md:w-10 h-6 md:h-10'
							alt='MetaERP Odoo Client logo'
						></Image>
						<span className='ml-3 font-bold leading-5'>MetaERP Odoo Client</span>
					</a>
					<nav
						aria-label='Footer'
						className='flex flex-wrap justify-center gap-x-2 md:gap-x-5 gap-y-1'
					>
						{linkList.map((link, index) => {
							return (
								<a
									key={index}
									title={link.name}
									href={isExternal(link.url) ? link.url : `/${langName}${link.url}`}
								>
									{link.name}
								</a>
							);
						})}
					</nav>
				</div>

				<p>
					©{' '}
					<a
						title={'glovebx'}
						href='https://github.com/glovebx/moco-odoo-client'
						target='_blank'
						rel='noopener'
					>
						MetaERP.AI
					</a>{' '}
					present.
				</p>
			</div>
		</footer>
	);
}
