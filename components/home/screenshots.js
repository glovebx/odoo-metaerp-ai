'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MdOutlinePhotoLibrary } from 'react-icons/md';
import { ScreenshotsList } from '@/lib/screenshotsList';

/**
 * Real-device screenshot gallery.
 *
 * Sits between the feature list and pricing so the claims above are backed by
 * what the app actually looks like. The grid is capped at 900px so each shot
 * renders at ~284px; images are 720px wide (2x+) and served through
 * `next/image` at quality 90, because these screens are dense with small UI text.
 */
export default function Screenshots({ langName = 'en' }) {
	const list = ScreenshotsList[`SHOTS_${langName.toUpperCase()}`] || ScreenshotsList.SHOTS_EN;

	return (
		<section
			id='screens'
			className='relative py-10 md:py-20'
		>
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5 }}
			>
				<div className='relative z-10 flex flex-col gap-5 items-start md:items-center mb-10 mx-auto'>
					<div className='relative inline-flex items-center justify-center gap-2 border-2 border-base-content px-5 md:px-10 py-1 md:py-3 rounded-full text-lg md:text-2xl font-semibold overflow-hidden'>
						<div className='inline-flex items-center justify-center gap-2 z-10'>
							<MdOutlinePhotoLibrary /> <h2>{list.h2}</h2>
						</div>
					</div>

					<h3 className='font-bold text-3xl md:text-5xl bg-linear-to-r from-base-content from-50% to-[#9c9c9c] md:text-center bg-clip-text text-transparent leading-[1.25em]!'>
						{list.h3}
					</h3>

					<h4 className='w-full md:w-10/12 mx-auto text-xl md:text-2xl text-base-content/80 md:text-center'>{list.description}</h4>
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5 }}
			>
				<div className='relative z-10 mx-auto grid w-full max-w-[1040px] grid-cols-2 gap-4 md:gap-6 sm:grid-cols-3 lg:grid-cols-4'>
					{list.items.map((item) => (
						<figure
							key={item.src}
							className='flex flex-col gap-2.5'
						>
							<div className='overflow-hidden rounded-2xl border border-base-content/15 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl'>
								<Image
									src={item.src}
									alt={`${item.title} — ${item.description}`}
									width={720}
									height={1335}
									quality={90}
									sizes='(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 242px'
									className='block h-auto w-full'
								/>
							</div>

							<figcaption>
								<p className='text-xs md:text-sm font-semibold'>{item.title}</p>
								<p className='mt-1 text-[11px] md:text-xs leading-snug text-base-content/70'>{item.description}</p>
							</figcaption>
						</figure>
					))}
				</div>
			</motion.div>

			<div className='hidden md:block absolute left-[30%] top-[10%] z-0'>
				<div className='absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]'></div>
			</div>
		</section>
	);
}
