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

interface Album {
	id: number;
	title: string;
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
