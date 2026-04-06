import {Composition} from 'remotion';
import {GiftsCommercial} from './Composition';

export const Root: React.FC = () => {
	return (
		<>
			<Composition
				id="GiftsCommercial"
				component={GiftsCommercial}
				durationInFrames={420}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};
