'use client';
import { motion } from 'framer-motion';
import { IoFlash } from 'react-icons/io5';

export default function News() {

	return (
		<>
			<section
				className='relative z-10 flex flex-col md:items-center py-6 md:py-6 overflow-hidden'
				style={{ perspective: '800px' }}
			>
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, type: 'spring', stiffness: 100, damping: 10 }}
				>
						<div className='flex flex-col md:flex-row gap-2'>
							<a
								title='odoo lastest updates'
								className='btn btn-sm md:btn-md btn-base rounded-full'
								href='/news.html'
								target="_blank"
								rel="noopener noreferrer" 
							>
								<IoFlash /> Odoo Updates
							</a>
						</div>
				</motion.div>
			</section>
		</>
	);
}
