import { Track } from "../../interfaces";

export interface PlaylistsRecommendations {
	batchId: string;
	tracks: Array<Track>;
}
