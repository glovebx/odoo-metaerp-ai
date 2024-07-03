import { TfiYoutube } from 'react-icons/tfi';
import { FaRedditAlien, FaTiktok, FaFacebook } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { FaXTwitter, FaSquareThreads, FaWeixin } from 'react-icons/fa6';
import { IoLogoWhatsapp } from 'react-icons/io';
import { RiWechatChannelsLine } from 'react-icons/ri';

const baseSiteConfig = {
	name: 'MetaERP Odoo Android App',
	description: 'This is a free and powerful odoo android app, it will help you to process your business smoother.',
	url: 'https://github.com/glovebx/moco-odoo-client',
	ogImage: 'https://api.moco.co/web/image/website/1/logo/%E9%A1%B9%E7%9B%AE%E5%B1%95%E7%A4%BA?unique=485906f',
	metadataBase: '/',
	keywords: [
		'metaerp odoo client',
		'erp android app',
		'scan qrcode by camera',
		'kotlin jetpack compose',
		'free odoo android app',
		'community enterprise',
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
