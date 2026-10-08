/**
 * Dev-only: Next.js blocks cross-origin requests to `/_next/*` dev resources
 * (chunks, HMR, fonts) unless the requesting origin is listed here.
 *
 * Without this, opening the dev server over the LAN (e.g. http://192.168.3.58:3000
 * from a phone or another machine) makes every JS chunk 403, React never
 * hydrates, and the page renders blank.
 *
 * `ALLOWED_DEV_ORIGINS` accepts a comma-separated list, so a different host or
 * network can be added per machine without editing this file.
 */
const allowedDevOrigins = [
	'192.168.3.58',
	'192.168.*.*',
	...(process.env.ALLOWED_DEV_ORIGINS?.split(',')
		.map((origin) => origin.trim())
		.filter(Boolean) ?? []),
];

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
	allowedDevOrigins,
};

export default nextConfig;
