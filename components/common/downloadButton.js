'use client';
import { useId, useRef, useState } from 'react';
import { FaDownload, FaGoogle, FaMobileScreenButton } from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';
import { downloads } from '@/lib/config/site';

const isAndroidDevice = () =>
	typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent);

const fileName = (url) => url.split('/').pop();

/**
 * "Get installer" trigger plus a platform-aware download dialog.
 *
 * - On an Android device it offers the two APK builds as direct downloads.
 *   The server sends `application/vnd.android.package-archive`, so Android
 *   hands the file straight to the package installer.
 * - Anywhere else it shows the download QR codes, because an APK is useless on
 *   a desktop and the visitor needs to continue on a phone.
 *
 * Which branch to show is decided at click time and stored in state, so nothing
 * platform-dependent is rendered on the server and there is no hydration
 * mismatch. The trigger keeps a real `href` to the GMS build: if the client
 * bundle ever fails to load, the link still downloads something useful instead
 * of doing nothing.
 */
export default function DownloadButton({ locale = {}, className = '', children }) {
	const dialogRef = useRef(null);
	const titleId = useId();
	const [mode, setMode] = useState(null);

	const handleClick = (event) => {
		// No <dialog> support (or no JS bundle): let the default href download.
		if (typeof window === 'undefined' || typeof dialogRef.current?.showModal !== 'function') return;
		event.preventDefault();
		setMode(isAndroidDevice() ? 'android' : 'other');
		dialogRef.current.showModal();
	};

	const builds = [
		{
			key: 'hms',
			Icon: FaMobileScreenButton,
			title: locale.hmsTitle,
			description: locale.hmsDesc,
			short: locale.hmsShort,
			...downloads.hms,
		},
		{
			key: 'gms',
			Icon: FaGoogle,
			title: locale.gmsTitle,
			description: locale.gmsDesc,
			short: locale.gmsShort,
			...downloads.gms,
		},
	];

	return (
		<>
			<a
				href={downloads.gms.url}
				onClick={handleClick}
				className={className}
				title={locale.title}
				rel='noopener'
			>
				{children}
			</a>

			<dialog
				ref={dialogRef}
				className='modal modal-bottom sm:modal-middle'
				aria-labelledby={titleId}
			>
				<div className='modal-box max-w-2xl bg-base-100'>
					<div className='flex items-start justify-between gap-4'>
						<h3
							id={titleId}
							className='font-bold text-lg md:text-xl'
						>
							{mode === 'other' ? locale.scanTitle : locale.title}
						</h3>

						<form method='dialog'>
							<button
								className='btn btn-sm btn-circle btn-ghost'
								aria-label={locale.close}
								title={locale.close}
							>
								<MdClose size={18} />
							</button>
						</form>
					</div>

					{mode === 'android' && (
						<div className='py-4 flex flex-col gap-3'>
							<p className='text-base-content/80'>{locale.androidHint}</p>

							{builds.map(({ key, Icon, title, description, url }) => (
								<a
									key={key}
									href={url}
									className='flex items-start gap-3 rounded-box border border-base-content/20 p-4 transition-colors hover:bg-base-content/5'
									title={title}
								>
									<Icon
										size={22}
										className='mt-0.5 shrink-0'
										aria-hidden
									/>
									<span className='min-w-0'>
										<span className='block font-semibold'>{title}</span>
										<span className='block text-sm text-base-content/70'>{description}</span>
										<span className='mt-1 block text-xs text-base-content/50 break-all'>{fileName(url)}</span>
									</span>
									<FaDownload
										size={16}
										className='ml-auto mt-1 shrink-0'
										aria-hidden
									/>
								</a>
							))}
						</div>
					)}

					{mode === 'other' && (
						<div className='py-4'>
							<p className='text-base-content/80'>{locale.scanHint}</p>

							<div className='mt-5 flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-start'>
								{builds.map(({ key, Icon, title, short, qr }) => (
									<div
										key={key}
										className='flex flex-col items-center gap-2'
									>
										{/*
										 * Always black-on-white inside its own box: the dark
										 * theme would otherwise render an unscannable QR. A plain
										 * <img> is used so the image is not re-encoded by the
										 * image optimizer — lossy artefacts can break scanning.
										 */}
										<div className='rounded-xl border border-base-content/10 bg-white p-3'>
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img
												src={qr}
												alt={`${title} — ${locale.scanTitle}`}
												width={180}
												height={180}
												className='block h-[160px] w-[160px] md:h-[180px] md:w-[180px]'
											/>
										</div>

										<span className='flex items-center gap-1.5 text-sm font-semibold'>
											<Icon
												size={14}
												aria-hidden
											/>
											{short}
										</span>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				<form
					method='dialog'
					className='modal-backdrop'
				>
					<button>{locale.close}</button>
				</form>
			</dialog>
		</>
	);
}
