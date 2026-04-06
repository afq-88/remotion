import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Sequence,
} from 'remotion';

// ── Palette ──────────────────────────────────────────────────────────────────
const GOLD = '#D4AF37';
const DEEP = '#1A0A2E';
const CREAM = '#FFF8F0';
const ROSE = '#E8647A';
const MINT = '#3DD6A3';

// ── Helpers ───────────────────────────────────────────────────────────────────
const useFade = (start: number, duration = 20) => {
	const frame = useCurrentFrame();
	return interpolate(frame - start, [0, duration], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
};

const useSlideUp = (start: number, fps: number) => {
	const frame = useCurrentFrame();
	const progress = spring({frame: frame - start, fps, config: {damping: 18, stiffness: 120}});
	return interpolate(progress, [0, 1], [60, 0]);
};

// ── Scene 1 – Hero / Brand Intro (0–120) ─────────────────────────────────────
const HeroScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const bgScale = interpolate(frame, [0, 120], [1.08, 1], {extrapolateRight: 'clamp'});
	const logoOpacity = useFade(10, 25);
	const taglineOpacity = useFade(35, 25);
	const subtitleOpacity = useFade(55, 25);

	const logoY = useSlideUp(10, fps);
	const taglineY = useSlideUp(35, fps);

	// Sparkles
	const sparkles = [
		{x: '12%', y: '18%', delay: 20, size: 18},
		{x: '85%', y: '12%', delay: 30, size: 14},
		{x: '90%', y: '78%', delay: 40, size: 22},
		{x: '8%',  y: '80%', delay: 50, size: 16},
		{x: '50%', y: '8%',  delay: 15, size: 12},
	];

	return (
		<AbsoluteFill style={{background: DEEP, overflow: 'hidden'}}>
			{/* Radial gradient glow */}
			<AbsoluteFill
				style={{
					background: `radial-gradient(ellipse 70% 60% at 50% 50%, #3D1F6E 0%, ${DEEP} 70%)`,
					transform: `scale(${bgScale})`,
				}}
			/>

			{/* Sparkle dots */}
			{sparkles.map((s, i) => {
				const op = interpolate(frame - s.delay, [0, 15, 30, 60], [0, 1, 0.6, 1], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				});
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: s.x,
							top: s.y,
							width: s.size,
							height: s.size,
							borderRadius: '50%',
							background: GOLD,
							opacity: op,
							boxShadow: `0 0 ${s.size * 2}px ${GOLD}`,
						}}
					/>
				);
			})}

			{/* Gift ribbon decoration */}
			<AbsoluteFill style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<div
					style={{
						position: 'absolute',
						width: 320,
						height: 320,
						borderRadius: 24,
						border: `3px solid ${GOLD}`,
						opacity: interpolate(frame, [0, 40], [0, 0.25], {extrapolateRight: 'clamp'}),
						transform: `rotate(${interpolate(frame, [0, 120], [5, 0])}deg)`,
					}}
				/>
				<div
					style={{
						position: 'absolute',
						width: 360,
						height: 360,
						borderRadius: 32,
						border: `1.5px solid ${GOLD}`,
						opacity: interpolate(frame, [0, 40], [0, 0.12], {extrapolateRight: 'clamp'}),
						transform: `rotate(${interpolate(frame, [0, 120], [-8, 0])}deg)`,
					}}
				/>
			</AbsoluteFill>

			{/* Text content */}
			<AbsoluteFill
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 24,
				}}
			>
				{/* Brand icon */}
				<div
					style={{
						fontSize: 80,
						opacity: logoOpacity,
						transform: `translateY(${logoY}px)`,
						filter: `drop-shadow(0 0 20px ${GOLD})`,
					}}
				>
					🎁
				</div>

				{/* Brand name */}
				<div
					style={{
						opacity: logoOpacity,
						transform: `translateY(${logoY}px)`,
						textAlign: 'center',
					}}
				>
					<div
						style={{
							fontFamily: 'Georgia, serif',
							fontSize: 72,
							fontWeight: 700,
							color: CREAM,
							letterSpacing: '0.04em',
							lineHeight: 1.1,
						}}
					>
						Designed
					</div>
					<div
						style={{
							fontFamily: 'Georgia, serif',
							fontSize: 72,
							fontWeight: 700,
							color: GOLD,
							letterSpacing: '0.04em',
							lineHeight: 1.1,
						}}
					>
						With Love
					</div>
				</div>

				{/* Tagline */}
				<div
					style={{
						opacity: taglineOpacity,
						transform: `translateY(${taglineY}px)`,
						fontFamily: 'sans-serif',
						fontSize: 28,
						color: CREAM,
						letterSpacing: '0.18em',
						textTransform: 'uppercase',
						fontWeight: 300,
					}}
				>
					Gifts &amp; Giveaways
				</div>

				{/* Divider */}
				<div
					style={{
						opacity: subtitleOpacity,
						width: interpolate(frame, [55, 90], [0, 200], {extrapolateRight: 'clamp'}),
						height: 2,
						background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
					}}
				/>

				<div
					style={{
						opacity: subtitleOpacity,
						fontFamily: 'sans-serif',
						fontSize: 20,
						color: '#BBA0D0',
						letterSpacing: '0.1em',
						textTransform: 'uppercase',
					}}
				>
					Custom · Memorable · Unique
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

// ── Scene 2 – Services Showcase (120–270) ─────────────────────────────────────
const services = [
	{icon: '🎨', title: 'Custom Design', desc: 'One-of-a-kind gifts tailored to your brand'},
	{icon: '🎀', title: 'Corporate Giveaways', desc: 'Impress clients & staff with premium gifts'},
	{icon: '🏆', title: 'Award Packages', desc: 'Celebrate milestones in style'},
];

const ServiceCard: React.FC<{
	icon: string;
	title: string;
	desc: string;
	delay: number;
}> = ({icon, title, desc, delay}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const progress = spring({
		frame: frame - delay,
		fps,
		config: {damping: 20, stiffness: 100},
	});
	const opacity = interpolate(progress, [0, 1], [0, 1]);
	const y = interpolate(progress, [0, 1], [80, 0]);
	const scale = interpolate(progress, [0, 1], [0.85, 1]);

	return (
		<div
			style={{
				opacity,
				transform: `translateY(${y}px) scale(${scale})`,
				background: 'rgba(255,255,255,0.06)',
				border: `1.5px solid ${GOLD}44`,
				borderRadius: 20,
				padding: '40px 32px',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: 16,
				width: 280,
				backdropFilter: 'blur(10px)',
			}}
		>
			<div style={{fontSize: 52}}>{icon}</div>
			<div
				style={{
					fontFamily: 'Georgia, serif',
					fontSize: 26,
					fontWeight: 700,
					color: GOLD,
					textAlign: 'center',
				}}
			>
				{title}
			</div>
			<div
				style={{
					fontFamily: 'sans-serif',
					fontSize: 16,
					color: '#C8BAD8',
					textAlign: 'center',
					lineHeight: 1.6,
				}}
			>
				{desc}
			</div>
		</div>
	);
};

const ServicesScene: React.FC = () => {
	const frame = useCurrentFrame();
	const headingOpacity = useFade(0, 20);
	const headingY = useSlideUp(0, 30);

	return (
		<AbsoluteFill
			style={{
				background: `linear-gradient(135deg, #1A0A2E 0%, #2D1055 100%)`,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 48,
			}}
		>
			{/* Background pattern */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundImage: `radial-gradient(circle, ${GOLD}18 1px, transparent 1px)`,
					backgroundSize: '50px 50px',
					opacity: 0.5,
				}}
			/>

			<div
				style={{
					opacity: headingOpacity,
					transform: `translateY(${headingY}px)`,
					textAlign: 'center',
				}}
			>
				<div
					style={{
						fontFamily: 'sans-serif',
						fontSize: 16,
						color: GOLD,
						letterSpacing: '0.3em',
						textTransform: 'uppercase',
						marginBottom: 12,
					}}
				>
					What We Offer
				</div>
				<div
					style={{
						fontFamily: 'Georgia, serif',
						fontSize: 52,
						fontWeight: 700,
						color: CREAM,
					}}
				>
					Our Services
				</div>
			</div>

			<div style={{display: 'flex', gap: 32, position: 'relative', zIndex: 1}}>
				{services.map((s, i) => (
					<ServiceCard key={i} {...s} delay={20 + i * 18} />
				))}
			</div>
		</AbsoluteFill>
	);
};

// ── Scene 3 – Why Choose Us (270–420) ──────────────────────────────────────
const stats = [
	{value: '500+', label: 'Happy Clients'},
	{value: '2000+', label: 'Designs Created'},
	{value: '100%', label: 'Satisfaction'},
];

const StatItem: React.FC<{value: string; label: string; delay: number}> = ({value, label, delay}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const progress = spring({frame: frame - delay, fps, config: {damping: 18, stiffness: 90}});
	const scale = interpolate(progress, [0, 1], [0, 1]);
	const opacity = interpolate(progress, [0, 1], [0, 1]);

	return (
		<div
			style={{
				opacity,
				transform: `scale(${scale})`,
				textAlign: 'center',
				padding: '0 48px',
			}}
		>
			<div
				style={{
					fontFamily: 'Georgia, serif',
					fontSize: 80,
					fontWeight: 700,
					color: GOLD,
					lineHeight: 1,
				}}
			>
				{value}
			</div>
			<div
				style={{
					fontFamily: 'sans-serif',
					fontSize: 20,
					color: CREAM,
					letterSpacing: '0.1em',
					textTransform: 'uppercase',
					marginTop: 8,
					opacity: 0.8,
				}}
			>
				{label}
			</div>
		</div>
	);
};

const WhyUsScene: React.FC = () => {
	const frame = useCurrentFrame();
	const titleOpacity = useFade(0, 20);
	const titleY = useSlideUp(0, 30);

	const featureOpacity = useFade(30, 20);
	const featureY = useSlideUp(30, 30);

	const features = [
		'✦  Premium quality materials',
		'✦  Fast turnaround times',
		'✦  Bulk orders welcome',
		'✦  Eco-friendly options available',
	];

	return (
		<AbsoluteFill
			style={{
				background: DEEP,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 56,
			}}
		>
			{/* Decorative circle */}
			<div
				style={{
					position: 'absolute',
					width: 700,
					height: 700,
					borderRadius: '50%',
					border: `1px solid ${GOLD}20`,
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					width: 500,
					height: 500,
					borderRadius: '50%',
					border: `1px solid ${GOLD}15`,
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
				}}
			/>

			{/* Stats row */}
			<div
				style={{
					opacity: titleOpacity,
					transform: `translateY(${titleY}px)`,
					textAlign: 'center',
				}}
			>
				<div style={{fontFamily: 'sans-serif', fontSize: 16, color: GOLD, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 8}}>
					Our Track Record
				</div>
				<div style={{fontFamily: 'Georgia, serif', fontSize: 48, fontWeight: 700, color: CREAM}}>
					Trusted by Many
				</div>
			</div>

			<div style={{display: 'flex', gap: 0, position: 'relative', zIndex: 1}}>
				{stats.map((s, i) => (
					<div key={i} style={{display: 'flex', alignItems: 'center'}}>
						<StatItem {...s} delay={15 + i * 20} />
						{i < stats.length - 1 && (
							<div style={{width: 1, height: 80, background: `${GOLD}40`}} />
						)}
					</div>
				))}
			</div>

			{/* Features list */}
			<div
				style={{
					opacity: featureOpacity,
					transform: `translateY(${featureY}px)`,
					display: 'flex',
					flexDirection: 'column',
					gap: 12,
					alignItems: 'center',
				}}
			>
				{features.map((f, i) => (
					<div
						key={i}
						style={{
							fontFamily: 'sans-serif',
							fontSize: 20,
							color: '#C8BAD8',
							letterSpacing: '0.05em',
						}}
					>
						{f}
					</div>
				))}
			</div>
		</AbsoluteFill>
	);
};

// ── Scene 4 – Process (420–570) ───────────────────────────────────────────────
const steps = [
	{num: '01', title: 'Consult', desc: 'Tell us your vision & needs', icon: '💬'},
	{num: '02', title: 'Design', desc: 'We craft your custom concept', icon: '✏️'},
	{num: '03', title: 'Produce', desc: 'High-quality production', icon: '⚙️'},
	{num: '04', title: 'Deliver', desc: 'Right to your doorstep', icon: '🚀'},
];

const ProcessStep: React.FC<{num: string; title: string; desc: string; icon: string; delay: number}> = ({
	num, title, desc, icon, delay,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const progress = spring({frame: frame - delay, fps, config: {damping: 20, stiffness: 100}});
	const x = interpolate(progress, [0, 1], [-60, 0]);
	const opacity = interpolate(progress, [0, 1], [0, 1]);

	return (
		<div
			style={{
				opacity,
				transform: `translateX(${x}px)`,
				display: 'flex',
				alignItems: 'center',
				gap: 24,
				background: 'rgba(255,255,255,0.04)',
				border: `1px solid ${GOLD}30`,
				borderRadius: 16,
				padding: '20px 32px',
				width: 520,
			}}
		>
			<div style={{fontSize: 36}}>{icon}</div>
			<div
				style={{
					fontFamily: 'Georgia, serif',
					fontSize: 40,
					fontWeight: 700,
					color: `${GOLD}50`,
					minWidth: 56,
				}}
			>
				{num}
			</div>
			<div>
				<div style={{fontFamily: 'Georgia, serif', fontSize: 24, color: CREAM, fontWeight: 700}}>
					{title}
				</div>
				<div style={{fontFamily: 'sans-serif', fontSize: 16, color: '#9A8AAA', marginTop: 4}}>
					{desc}
				</div>
			</div>
		</div>
	);
};

const ProcessScene: React.FC = () => {
	const frame = useCurrentFrame();
	const headingOpacity = useFade(0, 20);
	const headingY = useSlideUp(0, 30);

	return (
		<AbsoluteFill
			style={{
				background: `linear-gradient(160deg, #1A0A2E 0%, #2A1060 100%)`,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 32,
			}}
		>
			<div
				style={{
					opacity: headingOpacity,
					transform: `translateY(${headingY}px)`,
					textAlign: 'center',
					marginBottom: 8,
				}}
			>
				<div style={{fontFamily: 'sans-serif', fontSize: 15, color: GOLD, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 10}}>
					Simple Process
				</div>
				<div style={{fontFamily: 'Georgia, serif', fontSize: 50, fontWeight: 700, color: CREAM}}>
					How It Works
				</div>
			</div>

			<div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
				{steps.map((s, i) => (
					<ProcessStep key={i} {...s} delay={15 + i * 18} />
				))}
			</div>
		</AbsoluteFill>
	);
};

// ── Scene 5 – CTA / Outro (570–720) ───────────────────────────────────────────
const CTAScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const bgProgress = spring({frame, fps, config: {damping: 30, stiffness: 60}});
	const bgScale = interpolate(bgProgress, [0, 1], [1.1, 1]);

	const titleOpacity = useFade(15, 25);
	const titleY = useSlideUp(15, fps);
	const ctaOpacity = useFade(40, 25);
	const ctaScale = spring({frame: frame - 40, fps, config: {damping: 16, stiffness: 120}});
	const contactOpacity = useFade(65, 25);
	const logoOpacity = useFade(85, 25);

	// Confetti-like sparkles
	const sparkles = Array.from({length: 12}, (_, i) => ({
		x: `${8 + i * 8}%`,
		y: `${20 + (i % 3) * 25}%`,
		delay: 10 + i * 5,
		color: i % 3 === 0 ? GOLD : i % 3 === 1 ? ROSE : MINT,
		size: 8 + (i % 4) * 4,
	}));

	return (
		<AbsoluteFill
			style={{
				background: DEEP,
				overflow: 'hidden',
			}}
		>
			{/* Gradient background */}
			<AbsoluteFill
				style={{
					background: `radial-gradient(ellipse 80% 70% at 50% 50%, #4A1080 0%, ${DEEP} 65%)`,
					transform: `scale(${bgScale})`,
				}}
			/>

			{/* Sparkles */}
			{sparkles.map((s, i) => {
				const op = interpolate(frame - s.delay, [0, 20, 40, 120], [0, 1, 0.5, 0.8], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				});
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: s.x,
							top: s.y,
							width: s.size,
							height: s.size,
							borderRadius: '50%',
							background: s.color,
							opacity: op,
							boxShadow: `0 0 ${s.size * 3}px ${s.color}`,
						}}
					/>
				);
			})}

			<AbsoluteFill
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 28,
				}}
			>
				{/* Headline */}
				<div
					style={{
						opacity: titleOpacity,
						transform: `translateY(${titleY}px)`,
						textAlign: 'center',
					}}
				>
					<div
						style={{
							fontFamily: 'Georgia, serif',
							fontSize: 64,
							fontWeight: 700,
							color: CREAM,
							lineHeight: 1.15,
						}}
					>
						Make Every Gift
					</div>
					<div
						style={{
							fontFamily: 'Georgia, serif',
							fontSize: 64,
							fontWeight: 700,
							color: GOLD,
							lineHeight: 1.15,
						}}
					>
						Unforgettable
					</div>
				</div>

				<div
					style={{
						opacity: ctaOpacity,
						transform: `scale(${interpolate(ctaScale, [0, 1], [0.8, 1])})`,
					}}
				>
					<div
						style={{
							background: `linear-gradient(135deg, ${GOLD}, #F0C060)`,
							color: DEEP,
							fontFamily: 'sans-serif',
							fontWeight: 700,
							fontSize: 24,
							letterSpacing: '0.08em',
							textTransform: 'uppercase',
							padding: '20px 56px',
							borderRadius: 60,
							boxShadow: `0 8px 32px ${GOLD}55`,
						}}
					>
						Order Your Custom Design Today
					</div>
				</div>

				<div
					style={{
						opacity: contactOpacity,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 10,
					}}
				>
					<div
						style={{
							fontFamily: 'sans-serif',
							fontSize: 18,
							color: '#C8BAD8',
							letterSpacing: '0.08em',
						}}
					>
						📧 hello@designedwithlove.com
					</div>
					<div
						style={{
							fontFamily: 'sans-serif',
							fontSize: 18,
							color: '#C8BAD8',
							letterSpacing: '0.08em',
						}}
					>
						🌐 www.designedwithlove.com
					</div>
				</div>

				{/* Bottom brand */}
				<div
					style={{
						opacity: logoOpacity,
						marginTop: 8,
						display: 'flex',
						alignItems: 'center',
						gap: 12,
					}}
				>
					<span style={{fontSize: 28}}>🎁</span>
					<span
						style={{
							fontFamily: 'Georgia, serif',
							fontSize: 22,
							color: GOLD,
							letterSpacing: '0.1em',
						}}
					>
						Designed With Love
					</span>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

// ── Root Composition ──────────────────────────────────────────────────────────
export const GiftsCommercial: React.FC = () => {
	return (
		<AbsoluteFill style={{background: DEEP}}>
			<Sequence from={0} durationInFrames={120}>
				<HeroScene />
			</Sequence>
			<Sequence from={120} durationInFrames={150}>
				<ServicesScene />
			</Sequence>
			<Sequence from={270} durationInFrames={150}>
				<WhyUsScene />
			</Sequence>
			<Sequence from={420} durationInFrames={150}>
				<ProcessScene />
			</Sequence>
			<Sequence from={570} durationInFrames={150}>
				<CTAScene />
			</Sequence>
		</AbsoluteFill>
	);
};
