import { Track } from "../tracks/tracks.interfaces";

export interface FeedHeadlines {
	type: string;
	id: string;
	message: string;
}

export interface FeedEvents {
	id: string;
	type: string;
	typeForFrom: string;
	title: Array<{ type: string; text: string }>;
	genre: string;
	radioIsAvailable: boolean;
	tracks: Array<Track>;
}

export interface FeedDays {
	day: string;
	events: FeedEvents;
	tracksToPlay: Array<Track>;
	tracksToPlayWithAds: Array<Track>;
}

export interface Feed {
	canGetMoreEvents: boolean;
	pumpkin: boolean;
	isWizardPassed: boolean;
	generatedPlaylists: Array<any>;
	headlines: Array<FeedHeadlines>;
	today: string;
	days: Array<FeedDays>;
}
