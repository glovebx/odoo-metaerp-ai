/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'odoo.metaerp.ai',
			},
		],
	},
};

export default nextConfig;
