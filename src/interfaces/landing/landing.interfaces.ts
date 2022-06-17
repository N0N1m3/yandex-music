import { CoverPlaylist, Owner } from "../common";

import { Track } from "../tracks/tracks.interfaces";

export interface BlockBase {
	type: string;
	typeForFrom: string;
	title: string;
}

export interface Podcast extends BlockBase {
	podcasts: Array<number>;
}

export interface NewRealeses extends BlockBase {
	id: string;
	newReleases: Array<number>;
}

export interface NewPlaylists extends BlockBase {
	id: string;
	newPlaylists: Array<{ uid: number; kind: number }>;
}

export interface LandingBlock extends BlockBase {
	id: string;
	description: string;
	entities: Array<LandingBlockEntities>;
}

export interface LandingBlockEntities {
	id: string;
	type: string;
	data: {
		title: string;
		url: string;
		urlScheme: string;
		textColor: string;
		backgroundColor: string;
		backgroundImageUri: string;
		coverWhite: string;
	};
}

export interface Landing {
	pumpkin: boolean;
	contentId: string;
	blocks: Array<LandingBlock>;
}

export interface ChartTrack {
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

export interface ChartSimilar extends ChartBase {
	backgroundColor: string;
	textColor: string;
	image: string;
	actionButton: {
		text: string;
		url: string;
		color: string;
	};
}

export interface ChartBase {
	owner: Owner;
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
	cover: CoverPlaylist;
	ogImage: string;
	tags: Array<{ id: string; value: string }>;
	likesCount: number;
}

export interface ChartInfo extends ChartBase {
	tracks: Array<ChartTrack>;
	similarPlaylists: Array<ChartSimilar>;
}

export interface Chart extends BlockBase {
	id: string;
	chartDescription: string;
	menu: { items: Array<{ title: string; url: string; selected?: boolean }> };
	chart: ChartInfo;
}
