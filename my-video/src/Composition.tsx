import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Sequence,
} from 'remotion';

// ── Helpers ──────────────────────────────────────────────────────────────────

const useFadeIn = (start: number, duration = 20) => {
	const frame = useCurrentFrame();
	return interpolate(frame, [start, start + duration], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
};

const useSlideUp = (start: number, delay = 0) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const progress = spring({
		frame: frame - start - delay,
		fps,
		config: {damping: 14, stiffness: 120, mass: 0.8},
	});
	return interpolate(progress, [0, 1], [60, 0]);
};

const useScale = (start: number, delay = 0) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return spring({
		frame: frame - start - delay,
		fps,
		config: {damping: 12, stiffness: 100, mass: 0.6},
		from: 0.4,
		to: 1,
	});
};

// ── Color palette ─────────────────────────────────────────────────────────────

const PURPLE = '#4B1FA8';
const GOLD = '#F5C842';
const GOLD_LIGHT = '#FDE98C';
const WHITE = '#FFFFFF';
const DARK = '#1A0A40';

// ── Scene 1 – Brand Intro (frames 0–90) ──────────────────────────────────────

const SceneIntro: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const logoScale = spring({frame, fps, config: {damping: 10, stiffness: 80, mass: 1}, from: 0, to: 1});
	const titleOpacity = useFadeIn(20, 25);
	const taglineOpacity = useFadeIn(42, 25);
	const titleY = useSlideUp(20);
	const taglineY = useSlideUp(42);

	// Sparkle positions
	const sparkles = [
		{x: 160, y: 200, delay: 10, size: 36},
		{x: 1760, y: 180, delay: 15, size: 28},
		{x: 140, y: 820, delay: 20, size: 32},
		{x: 1780, y: 860, delay: 12, size: 24},
		{x: 960, y: 100, delay: 8, size: 20},
		{x: 400, y: 950, delay: 18, size: 22},
		{x: 1500, y: 960, delay: 22, size: 30},
	];

	return (
		<AbsoluteFill
			style={{
				background: `radial-gradient(ellipse at 50% 40%, #6B2FD4 0%, ${PURPLE} 45%, ${DARK} 100%)`,
				justifyContent: 'center',
				alignItems: 'center',
				fontFamily: 'Georgia, serif',
			}}
		>
			{/* Sparkles */}
			{sparkles.map((s, i) => {
				const sparkOpacity = interpolate(
					frame,
					[s.delay, s.delay + 20],
					[0, 0.7],
					{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
				);
				const sparkScale = spring({
					frame: frame - s.delay,
					fps,
					config: {damping: 8, stiffness: 120},
					from: 0,
					to: 1,
				});
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: s.x,
							top: s.y,
							fontSize: s.size,
							opacity: sparkOpacity,
							transform: `scale(${sparkScale})`,
						}}
					>
						✨
					</div>
				);
			})}

			{/* Gift icon */}
			<div
				style={{
					fontSize: 120,
					transform: `scale(${logoScale})`,
					marginBottom: 20,
					filter: 'drop-shadow(0 8px 24px rgba(245,200,66,0.6))',
				}}
			>
				🎁
			</div>

			{/* Brand name */}
			<div
				style={{
					opacity: titleOpacity,
					transform: `translateY(${titleY}px)`,
					textAlign: 'center',
				}}
			>
				<div
					style={{
						fontSize: 72,
						fontWeight: 'bold',
						color: GOLD,
						letterSpacing: 4,
						textShadow: `0 0 40px ${GOLD}99`,
					}}
				>
					GIFT CRAFTED
				</div>
				<div
					style={{
						width: 400,
						height: 3,
						background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
						margin: '16px auto',
					}}
				/>
			</div>

			{/* Tagline */}
			<div
				style={{
					opacity: taglineOpacity,
					transform: `translateY(${taglineY}px)`,
					textAlign: 'center',
					marginTop: 8,
				}}
			>
				<div
					style={{
						fontSize: 28,
						color: GOLD_LIGHT,
						letterSpacing: 6,
						fontStyle: 'italic',
					}}
				>
					Designing Gifts &amp; Giveaways That Leave a Mark
				</div>
			</div>
		</AbsoluteFill>
	);
};

// ── Scene 2 – Product Showcase (frames 90–210) ────────────────────────────────

const products = [
	{emoji: '🏷️', label: 'Custom Branded Tags'},
	{emoji: '👜', label: 'Premium Gift Bags'},
	{emoji: '🖊️', label: 'Personalised Pens'},
	{emoji: '📦', label: 'Luxury Gift Boxes'},
	{emoji: '🎀', label: 'Ribbon & Wrap'},
	{emoji: '🛍️', label: 'Corporate Giveaways'},
];

const SceneShowcase: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const headingOpacity = useFadeIn(0, 20);
	const headingY = useSlideUp(0);

	return (
		<AbsoluteFill
			style={{
				background: `linear-gradient(160deg, ${DARK} 0%, #2D0E6E 60%, #1A0A40 100%)`,
				fontFamily: 'Georgia, serif',
				padding: '60px 100px',
			}}
		>
			{/* Heading */}
			<div
				style={{
					opacity: headingOpacity,
					transform: `translateY(${headingY}px)`,
					textAlign: 'center',
					marginBottom: 60,
				}}
			>
				<div style={{fontSize: 48, fontWeight: 'bold', color: GOLD, letterSpacing: 3}}>
					What We Create
				</div>
				<div
					style={{
						width: 300,
						height: 2,
						background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
						margin: '14px auto 0',
					}}
				/>
			</div>

			{/* Product grid */}
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'center',
					gap: 40,
				}}
			>
				{products.map((p, i) => {
					const delay = i * 8;
					const cardOpacity = interpolate(
						frame,
						[20 + delay, 40 + delay],
						[0, 1],
						{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
					);
					const cardScale = spring({
						frame: frame - 20 - delay,
						fps,
						config: {damping: 12, stiffness: 100},
						from: 0.5,
						to: 1,
					});
					const float = Math.sin((frame + i * 15) / 18) * 6;

					return (
						<div
							key={i}
							style={{
								opacity: cardOpacity,
								transform: `scale(${cardScale}) translateY(${float}px)`,
								background: 'rgba(255,255,255,0.07)',
								border: `1.5px solid ${GOLD}55`,
								borderRadius: 20,
								padding: '32px 36px',
								width: 240,
								textAlign: 'center',
								backdropFilter: 'blur(8px)',
								boxShadow: `0 8px 32px rgba(75,31,168,0.4), inset 0 1px 0 rgba(255,255,255,0.1)`,
							}}
						>
							<div style={{fontSize: 52, marginBottom: 14}}>{p.emoji}</div>
							<div
								style={{
									fontSize: 18,
									color: GOLD_LIGHT,
									fontWeight: 'bold',
									letterSpacing: 1,
								}}
							>
								{p.label}
							</div>
						</div>
					);
				})}
			</div>
		</AbsoluteFill>
	);
};

// ── Scene 3 – Why Choose Us (frames 210–330) ─────────────────────────────────

const benefits = [
	{icon: '🎨', title: 'Custom Designs', desc: 'Fully bespoke artwork tailored to your brand identity'},
	{icon: '⭐', title: 'Premium Quality', desc: 'Finest materials & finishes for lasting impressions'},
	{icon: '🚀', title: 'Fast Turnaround', desc: 'Quick production & delivery without compromising quality'},
	{icon: '💼', title: 'Bulk Orders', desc: 'Competitive pricing for corporate & event giveaways'},
];

const BenefitCard: React.FC<{icon: string; title: string; desc: string; index: number}> = ({
	icon,
	title,
	desc,
	index,
}) => {
	const frame = useCurrentFrame();
	const delay = index * 10;
	const cardOpacity = interpolate(
		frame,
		[15 + delay, 35 + delay],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);
	const cardY = useSlideUp(15, delay);
	const float = Math.sin((frame + index * 20) / 20) * 5;

	return (
		<div
			style={{
				opacity: cardOpacity,
				transform: `translateY(${(cardY as number) + float}px)`,
				background: 'rgba(255,255,255,0.92)',
				borderRadius: 24,
				padding: '40px 32px',
				width: 360,
				textAlign: 'center',
				boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
			}}
		>
			<div style={{fontSize: 56, marginBottom: 16}}>{icon}</div>
			<div
				style={{
					fontSize: 22,
					fontWeight: 'bold',
					color: PURPLE,
					marginBottom: 12,
					letterSpacing: 1,
				}}
			>
				{title}
			</div>
			<div style={{fontSize: 16, color: '#555', lineHeight: 1.5}}>{desc}</div>
		</div>
	);
};

const SceneBenefits: React.FC = () => {
	const headingOpacity = useFadeIn(0, 20);
	const headingY = useSlideUp(0);

	return (
		<AbsoluteFill
			style={{
				background: `linear-gradient(135deg, #F5C842 0%, #E8A800 35%, #C47B00 70%, #8B4500 100%)`,
				fontFamily: 'Georgia, serif',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '0 100px',
			}}
		>
			{/* Heading */}
			<div
				style={{
					position: 'absolute',
					top: 70,
					width: '100%',
					textAlign: 'center',
					opacity: headingOpacity,
					transform: `translateY(${headingY}px)`,
				}}
			>
				<div style={{fontSize: 50, fontWeight: 'bold', color: DARK, letterSpacing: 3}}>
					Why Choose Us?
				</div>
				<div
					style={{
						width: 280,
						height: 3,
						background: `linear-gradient(90deg, transparent, ${DARK}99, transparent)`,
						margin: '14px auto 0',
					}}
				/>
			</div>

			{/* Benefits row */}
			<div style={{display: 'flex', gap: 40, justifyContent: 'center', marginTop: 60}}>
				{benefits.map((b, i) => (
					<BenefitCard key={i} icon={b.icon} title={b.title} desc={b.desc} index={i} />
				))}
			</div>
		</AbsoluteFill>
	);
};

// ── Scene 4 – Call to Action (frames 330–420) ─────────────────────────────────

const SceneCTA: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const bgOpacity = useFadeIn(0, 30);
	const logoScale = useScale(10);
	const titleOpacity = useFadeIn(20, 25);
	const titleY = useSlideUp(20);
	const subOpacity = useFadeIn(35, 25);
	const subY = useSlideUp(35);
	const ctaOpacity = useFadeIn(50, 25);
	const ctaScale = useScale(50);

	const pulse = 1 + Math.sin(frame / 10) * 0.03;

	return (
		<AbsoluteFill
			style={{
				background: `radial-gradient(ellipse at 50% 50%, #6B2FD4 0%, ${PURPLE} 40%, ${DARK} 100%)`,
				fontFamily: 'Georgia, serif',
				justifyContent: 'center',
				alignItems: 'center',
				opacity: bgOpacity,
			}}
		>
			{/* Decorative ring */}
			<div
				style={{
					position: 'absolute',
					width: 600,
					height: 600,
					borderRadius: '50%',
					border: `2px solid ${GOLD}33`,
					transform: `scale(${pulse})`,
				}}
			/>
			<div
				style={{
					position: 'absolute',
					width: 750,
					height: 750,
					borderRadius: '50%',
					border: `1px solid ${GOLD}1A`,
					transform: `scale(${1 + Math.sin(frame / 14) * 0.02})`,
				}}
			/>

			{/* Logo */}
			<div style={{fontSize: 90, transform: `scale(${logoScale})`, marginBottom: 10}}>
				🎁
			</div>

			{/* Brand name */}
			<div
				style={{
					opacity: titleOpacity,
					transform: `translateY(${titleY}px)`,
					textAlign: 'center',
				}}
			>
				<div style={{fontSize: 64, fontWeight: 'bold', color: GOLD, letterSpacing: 4, textShadow: `0 0 40px ${GOLD}99`}}>
					GIFT CRAFTED
				</div>
				<div
					style={{
						width: 320,
						height: 2,
						background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
						margin: '12px auto',
					}}
				/>
			</div>

			{/* Subtitle */}
			<div
				style={{
					opacity: subOpacity,
					transform: `translateY(${subY}px)`,
					textAlign: 'center',
					marginBottom: 40,
				}}
			>
				<div style={{fontSize: 26, color: GOLD_LIGHT, letterSpacing: 3, fontStyle: 'italic'}}>
					Make Every Gift Unforgettable
				</div>
			</div>

			{/* CTA Button */}
			<div
				style={{
					opacity: ctaOpacity,
					transform: `scale(${ctaScale})`,
					textAlign: 'center',
				}}
			>
				<div
					style={{
						background: `linear-gradient(135deg, ${GOLD}, #E8A800)`,
						color: DARK,
						fontSize: 24,
						fontWeight: 'bold',
						padding: '22px 64px',
						borderRadius: 60,
						letterSpacing: 2,
						boxShadow: `0 8px 32px ${GOLD}66`,
						transform: `scale(${pulse})`,
					}}
				>
					Order Your Custom Gifts Today
				</div>
				<div style={{marginTop: 24, fontSize: 20, color: GOLD_LIGHT, letterSpacing: 2}}>
					www.giftcrafted.com  •  info@giftcrafted.com
				</div>
			</div>
		</AbsoluteFill>
	);
};

// ── Main Composition ──────────────────────────────────────────────────────────

export const GiftsCommercial: React.FC = () => {
	return (
		<AbsoluteFill>
			<Sequence from={0} durationInFrames={90}>
				<SceneIntro />
			</Sequence>
			<Sequence from={90} durationInFrames={120}>
				<SceneShowcase />
			</Sequence>
			<Sequence from={210} durationInFrames={120}>
				<SceneBenefits />
			</Sequence>
			<Sequence from={330} durationInFrames={90}>
				<SceneCTA />
			</Sequence>
		</AbsoluteFill>
	);
};
