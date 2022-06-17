import { CoverPlaylist, Owner } from "../common";

export type SearchType =
	| "all"
	| "artist"
	| "user"
	| "album"
	| "playlist"
	| "track"
	| "podcast";

export type SearchBest =
	| SeacrhAlbum
	| SearchArtist
	| SearchPodacstEpisodes
	| SearchPlaylist
	| SeacrhTrack
	| SearchPodcast;

export interface SearchPlaylist {
	childContent?: true;
	type?: string;
	ready?: boolean;
	uid: number;
	kind: number;
	trackCount: number;
	title: string;
	playlistUuid: string;
	owner: Owner;
	available: boolean;
	cover: CoverPlaylist;
	tags: Array<any>;
	regions: Array<string>;
}

export interface SearchPodacstEpisodes {
	id: number;
	available: boolean;
	availableAsRbt: boolean;
	availableForPremiumUsers: boolean;
	lyricsAvailable: boolean;
	rememberPosition: boolean;
	trackSource: string;
	lyricsInfo: {
		hasAvailableSyncLyrics: boolean;
		hasAvailableTextLyrics: boolean;
	};
	shortDescription: string;
	podcastEpisodeType: string;
	pubDate: string;
	trackSharingFlag: string;
	albums: Array<SeacrhAlbum>;
	coverUri: string;
	type: string;
	durationMs: number;
	explicit: boolean;
	title: string;
	artists: Array<SearchAlbumArtist>;
	regions: Array<string>;
}

export interface SearchPodcast {
	id: number;
	storageDir: string;
	originalReleaseYear: number;
	year: number;
	artists: Array<SearchAlbumArtist>;
	coverUri: string;
	trackCount: number;
	likesCount: number;
	available: boolean;
	contentWarning: string;
	availableForPremiumUsers: boolean;
	type: string;
	title: string;
	availableRegions: Array<string>;
	labels: Array<any>;
}

export interface SearchArtist extends Omit<SearchAlbumArtist, "decomposed"> {
	counts: {
		tracks: number;
		directAlbums: number;
		alsoAlbums: number;
		alsoTracks: number;
	};
	genres: Array<string>;
	ticketsAvailable: boolean;
	regions: Array<string>;
}

export interface SearchAlbumArtist {
	id: number;
	name: string;
	cover: {
		type: string;
		prefix: string;
		uri: string;
	};
	composer: boolean;
	various: boolean;
	decomposed: Array<any>;
}

interface SeacrhAlbum {
	id: number;
	storageDir: string;
	originalReleaseYear: number;
	year: number;
	artists: Array<SearchAlbumArtist>;
	coverUri: string;
	trackCount: number;
	likesCount: number;
	genre: string;
	available: boolean;
	availableForPremiumUsers: boolean;
	type: string;
	title: string;
	availableRegions: Array<string>;
	labels: Array<string>;
	trackPosition: {
		volume: number;
		index: number;
	};
}

export interface SeacrhTrack {
	id: number;
	available: boolean;
	availableAsRbt: boolean;
	availableForPremiumUsers: boolean;
	lyricsAvailable: boolean;
	rememberPosition: boolean;
	trackSource: string;
	lyricsInfo: {
		hasAvailableSyncLyrics: boolean;
		hasAvailableTextLyrics: boolean;
	};
	trackSharingFlag: string;
	albums: Array<SeacrhAlbum>;
	coverUri: string;
	type: string;
	durationMs: number;
	explicit: false;
	title: string;
	artists: Array<SearchAlbumArtist>;
	regions: Array<string>;
}

export interface ResultAny<T> {
	total: number;
	perPage: number;
	order: number;
	results: Array<T>;
}

export interface SeacrhResult {
	type?: SearchType;
	page?: number;
	perPage?: number;
	misspellCorrected?: false;
	nocorrect?: false;
	searchRequestId: string;
	text: string;
	best: {
		type: SearchType;
		result: SearchBest;
	};

	albums: ResultAny<SeacrhAlbum>;

	artists: ResultAny<SearchArtist>;

	podcast_episodes: ResultAny<SearchPodacstEpisodes>;

	playlists: ResultAny<SearchPlaylist>;

	tracks: ResultAny<SeacrhTrack>;

	podcasts: ResultAny<SearchPodcast>;
}

export interface SearchSuggest {
	best: {
		type: SearchType;
		text: string;
		result: SearchBest;
	};
	suggestions: Array<string>;
}
