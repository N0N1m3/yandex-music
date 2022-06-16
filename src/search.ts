export type SearchType =
	| "all"
	| "artist"
	| "user"
	| "album"
	| "playlist"
	| "track"
	| "podcast";

type SearchBest =
	| SeacrhAlbum
	| SearchArtist
	| SearchPodacstEpisodes
	| SearchPlaylist
	| SeacrhTrack
	| SearchPodcast;

interface SearchPlaylist {
	childContent?: true;
	type?: string;
	ready?: boolean;
	uid: number;
	kind: number;
	trackCount: number;
	title: string;
	playlistUuid: string;
	owner: {
		uid: number;
		login: string;
		name: string;
		sex: string;
		verified: boolean;
	};
	available: boolean;
	cover: {
		type: string;
		dir: string;
		version: string;
		uri: string;
		custom: boolean;
	};
	tags: Array<any>;
	regions: Array<string>;
}

interface SearchPodacstEpisodes {
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

interface SearchPodcast {
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

interface SearchArtist extends Omit<SearchAlbumArtist, "decomposed"> {
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

interface SearchAlbumArtist {
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

interface SeacrhTrack {
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

	albums: {
		total: number;
		perPage: number;
		order: number;
		results: Array<SeacrhAlbum>;
	};

	artists: {
		total: number;
		perPage: number;
		order: number;
		results: Array<SearchArtist>;
	};

	podcast_episodes: {
		total: number;
		perPage: number;
		order: number;
		results: Array<SearchPodacstEpisodes>;
	};

	playlists: {
		total: 4997;
		perPage: 4;
		order: 0;
		results: Array<SearchPlaylist>;
	};

	tracks: {
		total: number;
		perPage: number;
		order: number;
		results: Array<SeacrhTrack>;
	};

	podcasts: {
		total: number;
		perPage: number;
		order: number;
		results: Array<SearchPodcast>;
	};
}

export interface SearchSuggest {
	best: {
		type: SearchType;
		text: string;
		result: SearchBest;
	};
	suggestions: Array<string>;
}
