import { PlaylistCover, Track } from "../interfaces";

export interface ChartInterface {
	id: string;
	type: string;
	typeForFrom: string;
	title: string;
	chartDescription: string;
	menu: {
		items: Array<{
			title: string;
			url: string;
			selected?: boolean;
		}>;
	};
	chart: ChartInfo;
}

interface ChartTrack {
	id: number;
	track: Track;
	timestamp: string;
	playCount: number;
	chart: {
		position: number;
		progress: string;
		listeners: number;
		shift: number;
		bgColor: string;
	};
	recent: boolean;
}

interface ChartSimilar extends ChartCommon {
	backgroundColor: string;
	textColor: string;
	image: string;
	actionButton: {
		text: string;
		url: string;
		color: string;
	};
}

interface ChartInfo extends ChartCommon {
	tracks: Array<ChartTrack>;
	similarPlaylists: Array<ChartSimilar>;
}

interface ChartCommon {
	owner: {
		uid: number;
		login: string;
		name: string;
		sex: string;
		verified: boolean;
	};
	playlistUuid: string;
	available: true;
	uid: number;
	kind: number;
	title: string;
	description: string;
	descriptionFormatted: string;
	revision: number;
	snapshot: number;
	trackCount: number;
	visibility: string;
	collective: boolean;
	created: string;
	modified: string;
	isBanner: boolean;
	isPremiere: boolean;
	durationMs: number;
	cover: PlaylistCover;
	ogImage: string;
	tags: Array<{ id: string; value: string }>;
	likesCount: number;
}
