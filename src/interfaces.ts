interface InvocationInfo {
	hostname: string;
	"req-id": string;
	"exec-duration-mills": string;
}

export interface YandexMusicResponse<T> {
	invocationInfo: InvocationInfo;
	result: T;
}

export interface Cover {
	type: string;
	uri: string;
	prefix: string;
}

export interface Video {
	title: string;
	cover: string;
	embedUrl: string;
	provider: string;
	providerVideoId: string;
}

export type CoverSize =
	| "100x100"
	| "200x200"
	| "400x400"
	| "500x500"
	| "1000x1000";

export interface Track {
	id: string;
	realId: string;
	title: string;
	contentWarning: string;
	major: {
		id: number;
		name: string;
	};
	available: boolean;
	availableForPremiumUsers: boolean;
	availableFullWithoutPermission: boolean;
	storageDir: string;
	durationMs: number;
	fileSize: number;
	r128: {
		i: number;
		tp: number;
	};
	previewDurationMs: number;
	artists: Array<ArtistShort>;
	albums: Array<Album>;
	coverUri: string;
	ogImage: string;
	lyricsAvailable: boolean;
	type: string;
	rememberPosition: boolean;
	backgroundVideoUri: string;
	trackSharingFlag: string;
	playerId: string;
	lyricsInfo: {
		hasAvailableSyncLyrics: boolean;
		hasAvailableTextLyrics: boolean;
	};
	trackSource: string;
}

interface ArtistShort {
	id: number;
	name: string;
	various: boolean;
	composer: boolean;
	cover: Cover;
	genres: Array<string>;
}

export interface Album {
	id: number;
	title: string;
	type?: string;
	metaType: string;
	contentWarning: string;
	year: number;
	releaseDate: string;
	coverUri: string;
	ogImage: string;
	genre: string;
	buy: Array<any>;
	trackCount: number;
	likesCount: number;
	recent: boolean;
	veryImportant: boolean;
	artists: Array<ArtistShort>;
	labels: Array<number>;
	available: boolean;
	availableForPremiumUsers: boolean;
	availableForMobile: boolean;
	availablePartially: boolean;
	bests: Array<number>;
	trackPosition?: {
		volume: number;
		index: number;
	};
}

interface SocialLink {
	title: string;
	href: string;
	type: string;
	socialNetwork: string;
}

interface ArtistCounts {
	tracks: number;
	directAlbums: number;
	alsoAlbums: number;
	alsoTracks: number;
}

interface ArtistRatings {
	week: number;
	month: number;
	day: number;
}

export interface Artist {
	id: number;
	name: string;
	various: boolean;
	composer: boolean;
	cover: Cover;
	genres: Array<string>;
	ogImage: string;
	noPicturesFromSearch: boolean;
	counts: ArtistCounts;
	available: boolean;
	ratings: ArtistRatings;
	links: Array<SocialLink>;
	ticketsAvailable: boolean;
}

interface PlaylistCover {
	type: string;
	dir: string;
	version: string;
	uri: string;
	custom: boolean;
}

export interface Playlist {
	uid: number;
	kind: number;
	title: string;
	description: string;
	descriptionFormatted: string;
	cover: PlaylistCover;
	trackCount: number;
}

export interface ArtistAddon extends Artist {
	likesCount: string;
	fullNames: Array<string>;
	description: { text: string; uri: string };
	countries: Array<string>;
	initDate: string;
	enWikipediaLink: string;
	dbAliases: Array<string>;
}
