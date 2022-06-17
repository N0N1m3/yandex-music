import { Cover, SocialLink } from "../common";

export interface ArtistBase {
	id: number;
	name: string;
	various: boolean;
	composer: boolean;
	cover: Cover;
	genres: Array<string>;
}

export interface ArtistCounts {
	tracks: number;
	directAlbums: number;
	alsoAlbums: number;
	alsoTracks: number;
}

export interface ArtistRatings {
	week: number;
	month: number;
	day: number;
}

export interface Artist extends ArtistBase {
	ogImage: string;
	noPicturesFromSearch: boolean;
	counts: ArtistCounts;
	available: boolean;
	ratings: ArtistRatings;
	links: Array<SocialLink>;
	ticketsAvailable: boolean;
}
