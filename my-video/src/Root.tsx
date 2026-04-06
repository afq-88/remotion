import {Composition} from 'remotion';
import {GiftsCommercial} from './GiftsCommercial';

export const Root: React.FC = () => {
	return (
		<>
			<Composition
				id="GiftsCommercial"
				component={GiftsCommercial}
				durationInFrames={720}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};
