import { Album } from "../albums/albums.interfaces";

import { ArtistBase } from "../artists/artists.interfaces";

import { Lad } from "../common";

export interface Track {
	id: string;
	realId: string;
	title: string;
	contentWarning: string;
	minor?: Lad;
	major?: Lad;
	available: boolean;
	availableForPremiumUsers: boolean;
	availableFullWithoutPermission: boolean;
	storageDir: string;
	durationMs: number;
	fileSize: number;
	r128: { i: number; tp: number };
	previewDurationMs: number;
	artists: Array<ArtistBase>;
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

export type TrackDownloadInfo = Array<DownloadInfo>;

export interface DownloadInfo {
	codec: "mp3" | "aac";
	gain: boolean;
	preview: boolean;
	downloadInfoUrl: string;
	direct: boolean;
	bitrateInKbps: 32 | 96 | 128 | 160 | 192 | 256 | 320;
}

export interface DownloadUrl {
	s: string;
	ts: string;
	path: string;
	host: string;
}

export type TrackSimilar = { track: Track; similarTracks: Array<Track> };

export interface TrackSupplement {
	id: string;
	lyrics?: {
		id: number;
		lyrics: string;
		fullLyrics: string;
		hasRights: boolean;
		textLanguage: string;
		showTranslation: boolean;
	};
}
