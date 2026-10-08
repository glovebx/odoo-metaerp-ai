import React from 'react';

export default function CustomHead() {
	return (
		<>
			{/* <script
				async
				src='https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX'
			></script>
			<script
				dangerouslySetInnerHTML={{
					__html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXX');
        `,
				}}
			/> */}
			<script
				dangerouslySetInnerHTML={{
					__html: `
          (function() {
            const theme = localStorage.getItem('theme') || 'corporate';
            document.documentElement.setAttribute('data-theme', theme);
          })();
        `,
				}}
			/>
			{/*
			 * Reveal failsafe, part 1 of 2 (see app/globals.css).
			 *
			 * Framer Motion ships \`opacity: 0\` in the SSR HTML of every animated
			 * block, so if the client bundle never runs the page renders blank.
			 * This timer marks the document as un-hydrated; the stylesheet then
			 * force-reveals whatever is still stuck.
			 *
			 * Part 2 is components/common/hydrationBeacon.js, which cancels the
			 * timer as soon as React hydrates. The <noscript> block below covers
			 * the opposite case, where there is no JavaScript at all.
			 */}
			<noscript
				dangerouslySetInnerHTML={{
					__html: `<style>[style*="opacity:0"],[style*="opacity: 0"]{opacity:1 !important;transform:none !important}</style>`,
				}}
			/>
			<script
				dangerouslySetInnerHTML={{
					__html: `
          window.__revealFailsafe = setTimeout(function () {
            document.documentElement.setAttribute('data-hydration', 'failed');
          }, 2500);
        `,
				}}
			/>
		</>
	);
}
