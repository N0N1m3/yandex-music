import { ArtistBase } from "../artists/artists.interfaces";

import { Track } from "../tracks/tracks.interfaces";

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
	artists: Array<ArtistBase>;
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

export interface AlbumWithTracks extends Album {
	volumes: Array<Track>;
}
