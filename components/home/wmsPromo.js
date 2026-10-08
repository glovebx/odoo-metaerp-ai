import { FaWarehouse } from 'react-icons/fa6';
import { FiArrowUpRight } from 'react-icons/fi';
import { relatedProducts } from '@/lib/config/site';

const WMS_URL = relatedProducts.wms.url;

/**
 * Announcement strip for 奥道 WMS, pinned to the top of the hero.
 *
 * Written as a plain server-renderable component (no animation, no state) so
 * the introduction and the outbound link are in the first paint and visible to
 * crawlers that do not execute JavaScript.
 *
 * The surface is tinted with `base-content` rather than `base-200` on purpose:
 * in the `business` (dark) theme the base ramp is inverted, so `base-200` is
 * actually *darker* than `base-100` and the card would vanish into the page.
 */
export default function WmsPromo({ locale = {} }) {
	return (
		<div className='w-full mb-8 md:mb-12 rounded-2xl border border-base-content/20 bg-base-content/[0.06] p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-6'>
			<div className='flex items-start gap-3 md:gap-4 flex-1 min-w-0'>
				<span className='shrink-0 grid place-items-center w-10 h-10 rounded-full bg-base-content text-base-100'>
					<FaWarehouse
						size={18}
						aria-hidden
					/>
				</span>

				<div className='min-w-0'>
					<p className='flex flex-wrap items-center gap-2 font-bold text-base md:text-lg leading-snug'>
						<span className='text-[10px] md:text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-base-content text-base-100'>
							{locale.badge}
						</span>
						<span>{locale.title}</span>
					</p>
					<p className='mt-1 text-sm md:text-base text-base-content/70'>{locale.description}</p>
				</div>
			</div>

			<a
				href={WMS_URL}
				title={locale.title}
				aria-label={locale.cta}
				className='btn btn-sm md:btn-md shrink-0 self-start md:self-auto rounded-full border-none bg-base-content text-base-100 hover:bg-base-100 hover:text-base-content hover:ring-1 ring-base-content'
			>
				{locale.cta}
				<FiArrowUpRight
					size={16}
					aria-hidden
				/>
			</a>
		</div>
	);
}
