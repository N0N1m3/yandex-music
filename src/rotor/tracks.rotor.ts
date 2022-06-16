import { Track } from "../interfaces";

export interface RotorTracks {
	id: {
		type: string;
		tag: string;
	};
	sequence: Array<{
		type: string;
		track: Track;
		liked: boolean;
		trackParameters: {
			bpm: number;
			hue: number;
			energy: number;
		};
	}>;
	batchId: string;
	pumpkin: boolean;
}
