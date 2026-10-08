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

/**
 * Sibling MetaERP products promoted from this landing page. Kept here so the
 * hero promo, the JSON-LD `mentions` and the llms.txt files all point at the
 * same URL.
 */
export const relatedProducts = {
	wms: {
		name: '奥道 WMS',
		alternateName: 'MetaERP WMS',
		url: 'https://wms.metaerp.ai/',
	},
};

/**
 * Signed APK downloads offered by the "get installer" dialog, and the QR code
 * images generated for each. `qr` files were produced with the Python `qrcode`
 * package and decoded with `zbarimg` to confirm they resolve to `url`:
 *
 *   python3 -c "import qrcode;qrcode.make('URL').save('public/qr/hms.png')"
 *   zbarimg --quiet --raw public/qr/hms.png   # must print URL back
 *
 * The QR images are opaque black-on-white on purpose — a themed QR cannot be
 * scanned on a dark background.
 */
export const downloads = {
	hms: {
		url: 'https://dl.metaerp.ai/moco-odoo-client_19160_300_hms.apk',
		qr: '/qr/hms.png',
	},
	gms: {
		url: 'https://dl.metaerp.ai/moco-odoo-client_19160_300_gms.apk',
		qr: '/qr/gms.png',
	},
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
