#!/usr/bin/env node
/**
 * Device-detection regression test.
 *
 * Every user agent below is a real string observed from the device named in
 * the comment (Huawei's own samples, whatmyuseragent.com and whatmyua.com
 * device pages). They exist because a Huawei MatePad was once shown the desktop
 * QR branch: HarmonyOS NEXT reports **no "Android" token at all**.
 *
 * Run with `pnpm verify:device`.
 */
import { isInstallableDevice } from '../lib/device.js';

const CASES = [
	// --- must be offered the APK -------------------------------------------
	{
		device: 'Huawei MatePad (HarmonyOS 3, tablet) — has Android + HarmonyOS',
		installable: true,
		ua: 'Mozilla/5.0 (Linux; Android 12; HarmonyOS; BTK-W09; HMSCore 6.16.4.352) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.196 HuaweiBrowser/17.0.7.302 Safari/537.36',
	},
	{
		device: 'Huawei MatePad (HarmonyOS 3, tablet, no HMS token)',
		installable: true,
		ua: 'Mozilla/5.0 (Linux; Android 10; HarmonyOS; MRX-W09; HMSCore 6.16.2.342) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.196 HuaweiBrowser/17.0.6.313 Safari/537.36',
	},
	{
		device: 'Huawei phone (HarmonyOS, HMS core)',
		installable: true,
		ua: 'Mozilla/5.0 (Linux; Android 12; HarmonyOS; AGS5-L09; HMSCore 6.16.2.342) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.196 HuaweiBrowser/17.0.6.313 Safari/537.36',
	},
	{
		device: 'Huawei tablet (HarmonyOS NEXT / OpenHarmony) — the reported bug',
		installable: true,
		ua: 'Mozilla/5.0 (Tablet; OpenHarmony 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36ArkWeb/6.1.0.120 MQQBrowser/4.6',
	},
	{
		device: 'Huawei tablet (HarmonyOS NEXT, Huawei Browser)',
		installable: true,
		ua: 'Mozilla/5.0 (Tablet; OpenHarmony 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36ArkWeb/6.1.0.117 360Browser/1.2.24',
	},
	{
		device: 'Huawei tablet (HarmonyOS NEXT, desktop mode)',
		installable: true,
		ua: 'Mozilla/5.0 (Tablet; OpenHarmony 6.1; Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36ArkWeb/6.1.0.120 HuaweiBrowser/6.1.6.310',
	},
	{
		device: 'Huawei phone (HarmonyOS NEXT, ArkWeb only, no OpenHarmony word)',
		installable: true,
		ua: 'Mozilla/5.0 (Phone; OpenHarmony 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36ArkWeb/6.1.0.134 Mobile MQQBrowser/4.7',
	},
	{
		device: 'Huawei phone (OpenHarmony + Android both present)',
		installable: true,
		ua: 'Mozilla/5.0 (Phone; OpenHarmony 7.0; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36ArkWeb/7.0.0.33 Mobile HuaweiBrowser/6.1.6.310',
	},
	{
		device: 'Honor phone (MagicOS, Build/HONOR…)',
		installable: true,
		ua: 'Mozilla/5.0 (Linux; Android 16; JDY-LX1 Build/HONORJDY-L41) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/153.0.8010.36 Mobile Safari/537.36',
	},
	{
		device: 'Honor phone (MagicOS)',
		installable: true,
		ua: 'Mozilla/5.0 (Linux; Android 14; CLK-AN00 Build/HONORCLK-AN00) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
	},
	{
		device: 'Honor Pad tablet (Android, HuaweiMediaPad build)',
		installable: true,
		ua: 'Mozilla/5.0 (Linux; Android 6.0.1; JDN-W09 Build/HuaweiMediaPad) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.92 Safari/537.36',
	},
	{
		device: 'Google Pixel (plain Android)',
		installable: true,
		ua: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
	},
	{
		device: 'Android tablet (Samsung, no "Mobile" token)',
		installable: true,
		ua: 'Mozilla/5.0 (Linux; Android 13; SM-X710) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
	},

	// --- must get the QR code ----------------------------------------------
	{
		device: 'macOS desktop Chrome',
		installable: false,
		ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36',
	},
	{
		device: 'Windows desktop Chrome',
		installable: false,
		ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
	},
	{
		device: 'Windows desktop with Huawei Browser (must NOT match on vendor)',
		installable: false,
		ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.196 HuaweiBrowser/17.0.6.313 Safari/537.36',
	},
	{
		device: 'Linux desktop Chrome',
		installable: false,
		ua: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
	},
	{
		device: 'iPhone Safari',
		installable: false,
		ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
	},
	{
		device: 'iPad Safari',
		installable: false,
		ua: 'Mozilla/5.0 (iPad; CPU OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
	},
	{ device: 'empty user agent', installable: false, ua: '' },
	{ device: 'undefined user agent', installable: false, ua: undefined },
];

let failed = 0;
for (const { device, ua, installable } of CASES) {
	const actual = isInstallableDevice(ua);
	const ok = actual === installable;
	if (!ok) failed += 1;
	const expected = installable ? 'APK   ' : 'QR    ';
	console.log(`${ok ? '\u001b[32m✓\u001b[0m' : '\u001b[31m✗\u001b[0m'} ${expected} ${device}`);
	if (!ok) console.log(`      expected ${installable}, got ${actual} — ${ua}`);
}

console.log(`\n${CASES.length - failed}/${CASES.length} device cases passed`);
process.exit(failed ? 1 : 0);
