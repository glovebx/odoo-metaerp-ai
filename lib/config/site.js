import { TfiYoutube } from 'react-icons/tfi';
import { FaRedditAlien, FaTiktok, FaFacebook } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { FaXTwitter, FaSquareThreads, FaWeixin } from 'react-icons/fa6';
import { IoLogoWhatsapp } from 'react-icons/io';
import { RiWechatChannelsLine } from 'react-icons/ri';

const baseSiteConfig = {
	name: 'Odoo Harmony/Android App by MetaERP',
	description: 'Free and powerful odoo harmony/android app, it will help you to process your business smoother.鸿蒙/安卓',
	url: 'https://odoo.metaerp.ai',
	ogImage: 'https://odoo.metaerp.ai/og.png',
	metadataBase: 'https://odoo.metaerp.ai/',
	keywords: [
		'odoo 19',
		'metaerp odoo client',
		'erp android app',
		'erp harmony app',
		'scan qrcode by camera',
		'kotlin jetpack compose',
		'free odoo android app',
		'community enterprise',
		'鸿蒙',
		'安卓'
	],
	authors: [
		{
			name: 'glovebx',
			url: 'https://github.com/glovebx',
		},
	],
	icons: {
		icon: '/favicon.ico',
		shortcut: '/odoo.png',
		apple: '/odoo.png',
	}
};

export const SiteConfig = {
	...baseSiteConfig,
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: baseSiteConfig.url,
		title: baseSiteConfig.name,
		description: baseSiteConfig.description,
		siteName: baseSiteConfig.name,
	},
	twitter: {
		card: 'summary_large_image',
		title: baseSiteConfig.name,
		description: baseSiteConfig.description,
		images: [`${baseSiteConfig.url}/og.png`],
		creator: baseSiteConfig.creator,
	},
};
