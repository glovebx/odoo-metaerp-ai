/**
 * Can this device install the Android APK directly?
 *
 * User-agent sniffing is unavoidable here: the dialog has to choose between
 * "offer the APK" and "show a QR code to continue on a phone" before any
 * capability can be probed, and no feature test distinguishes HarmonyOS from a
 * desktop.
 *
 * The tokens below are not guesses — each one is taken from the real UA shapes
 * of a device we must recognise. `scripts/verify-device.mjs` runs this exact
 * corpus and will fail if any of them stops matching.
 *
 *   Android and Honor / MagicOS tablets — always carry "Android":
 *     Mozilla/5.0 (Linux; Android 14; CLK-AN00 Build/HONORCLK-AN00) … Mobile Safari/537.36
 *     Mozilla/5.0 (Linux; Android 6.0.1; JDN-W09 Build/HuaweiMediaPad) …
 *
 *   Huawei phones and MatePad tablets on HarmonyOS 2–4 — "Android" + "HarmonyOS":
 *     Mozilla/5.0 (Linux; Android 12; HarmonyOS; BTK-W09; HMSCore 6.16.4.352) …
 *       Chrome/114.0.5735.196 HuaweiBrowser/17.0.7.302 Safari/537.36
 *
 *   HarmonyOS NEXT / OpenHarmony tablets and phones — **no "Android" token at
 *   all**, which is exactly what made a Huawei tablet look like a desktop.
 *   These always carry "OpenHarmony" and/or "ArkWeb":
 *     Mozilla/5.0 (Tablet; OpenHarmony 6.1) … Chrome/132.0.0.0 Safari/537.36ArkWeb/6.1.0.120 HuaweiBrowser/6.1.6.310
 *     Mozilla/5.0 (Phone; OpenHarmony 6.1; Android 10) … Safari/537.36ArkWeb/6.1.0.120 Mobile HuaweiBrowser/6.1.6.310
 *
 * Two traps worth remembering:
 *  - `ArkWeb` is frequently glued to the previous token (`Safari/537.36ArkWeb/…`),
 *    so the pattern must NOT use a word boundary before it.
 *  - A Huawei tablet in "desktop mode" reports `(Tablet; OpenHarmony 6.1;
 *    Windows NT 10.0; Win64; x64)`. It still contains OpenHarmony, so it is
 *    correctly treated as installable rather than as a PC.
 */
const INSTALLABLE_UA = /android|harmonyos|openharmony|arkweb|hmscore/i;

/**
 * @param {string} userAgent - typically `navigator.userAgent`
 * @returns {boolean} true when the APK can be installed on this device
 */
export function isInstallableDevice(userAgent) {
	if (typeof userAgent !== 'string') return false;
	return INSTALLABLE_UA.test(userAgent);
}
