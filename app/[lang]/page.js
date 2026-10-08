import { defaultLocale, getDictionary, resolveLocale } from '@/lib/i18n';
import { PayPalProvider } from '@paypal/react-paypal-js/sdk-v6';
import PayPalButtonWrapper from '@/components/PayPalButtonWrapper';
import JsonLd from '@/components/common/JsonLd';
import { buildHomeGraph } from '@/lib/seo/structuredData';

import News from '@/components/home/news';
import Hero from '@/components/home/hero';
import Feature from '@/components/home/feature';
import Pricing from '@/components/home/pricing';
import Testimonial from '@/components/home/testimonial';
import Faq from '@/components/home/faq';
import Cta from '@/components/home/cta';
export default async function Home({ params }) {
	const { lang } = await params;
	const langName = lang || defaultLocale;
	const dict = await getDictionary(langName);

	return (
		<PayPalProvider
			clientId={process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}
			environment={process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'}
			components={["paypal-payments"]}
			pageType="checkout"
		>
			{/* SoftwareApplication + pricing offers + FAQ rich results for this locale. */}
			<JsonLd
				id='ld-home'
				data={buildHomeGraph(resolveLocale(langName), dict.Wms)}
			/>
			<div className='max-w-[1280px] mx-auto'>
				{/* <News/> */}
				<Hero
					locale={dict.Hero}
					CTALocale={dict.CTAButton}
					wmsLocale={dict.Wms}
					downloadLocale={dict.Download}
				/>
				{/* <div className="flex justify-center my-8">
					<PayPalButtonWrapper />
				</div> */}
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
					downloadLocale={dict.Download}
				/>
			</div>
		</PayPalProvider>
	);
}
