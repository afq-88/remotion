import {AbsoluteFill} from 'remotion';

export const MyComposition: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<p
				style={{
					fontFamily: 'sans-serif',
					fontSize: 80,
					fontWeight: 'bold',
				}}
			>
				Welcome to Remotion!
			</p>
		</AbsoluteFill>
	);
};
