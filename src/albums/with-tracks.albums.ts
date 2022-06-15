import { Track } from "../interfaces";

export interface AlbumWithTracksInterface {
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
	artists: Array<AlbumArtist>;
	labels: Array<{
		id: number;
		name: string;
	}>;
	available: boolean;
	availableForPremiumUsers: boolean;
	availableForMobile: boolean;
	availablePartially: boolean;
	bests: Array<number>;
	sortOrder: string;
	volumes: Array<Track>;
	pager: {
		total: number;
		page: number;
		perPage: number;
	};
}

interface AlbumArtist {
	id: number;
	name: string;
	various: boolean;
	composer: boolean;
	cover: {
		type: string;
		prefix: string;
		uri: string;
	};
	genres: Array<any>;
}
