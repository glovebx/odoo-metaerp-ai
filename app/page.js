import { defaultLocale, getDictionary } from '@/lib/i18n';

import News from '@/components/home/news';
import Hero from '@/components/home/hero';
import Feature from '@/components/home/feature';
import Pricing from '@/components/home/pricing';
import Testimonial from '@/components/home/testimonial';
import Faq from '@/components/home/faq';
import Cta from '@/components/home/cta';

export default async function Home({ params }) {

	const { lang } = await params; // 尝试先解构
	const langName = lang || defaultLocale; // 使用解构出的 lang
	// const langName = params.lang || defaultLocale;
	const dict = await getDictionary(langName); // 获取内容

	return (
		<div className='max-w-[1280px] mx-auto'>
			<News/>
			<Hero
				locale={dict.Hero}
				CTALocale={dict.CTAButton}
			/>
			<Feature
				locale={dict.Feature}
				langName={langName}
			/>
			<Pricing
				locale={dict.Pricing}
				langName={langName}
			/>
			<Testimonial
				locale={dict.Testimonial}
				langName={langName}
			/>
			<Faq
				locale={dict.Faq}
				langName={langName}
			/>
			<Cta
				locale={dict.CTA}
				CTALocale={dict.CTAButton}
			/>
		</div>
	);
}
