import { Track } from "../interfaces";

export interface FeedInterface {
	canGetMoreEvents: boolean;
	pumpkin: boolean;
	isWizardPassed: boolean;
	generatedPlaylists: Array<any>;
	headlines: Array<FeedHeadlines>;
	today: string;
	days: Array<{
		day: string;
		events: FeedEvents;
		tracksToPlay: Array<Track>;
		tracksToPlayWithAds: Array<Track>;
	}>;
}

interface FeedHeadlines {
	type: string;
	id: string;
	message: string;
}

interface FeedEvents {
	id: string;
	type: string;
	typeForFrom: string;
	title: Array<{ type: string; text: string }>;
	genre: string;
	radioIsAvailable: boolean;
	tracks: Array<Track>;
}
