'use client';
import { useEffect } from 'react';

/**
 * Reveal failsafe, part 2 of 2 (see app/globals.css and components/common/head.js).
 *
 * Framer Motion writes `opacity: 0` into the SSR HTML of every animated block
 * and only animates it to 1 once React hydrates. If the client bundle never
 * executes — JavaScript disabled, a chunk that 403s or fails, a proxy blocking
 * `/_next/*` — the whole page would render blank except for the few static
 * blocks.
 *
 * `components/common/head.js` arms a timer for that case. Reaching this effect
 * means hydration actually happened, so the timer is cancelled and the
 * stylesheet failsafe stays dormant, leaving the enter/scroll animations
 * untouched.
 */
export default function HydrationBeacon() {
	useEffect(() => {
		if (typeof window === 'undefined') return;

		if (window.__revealFailsafe) {
			clearTimeout(window.__revealFailsafe);
			window.__revealFailsafe = null;
		}
	}, []);

	return null;
}
