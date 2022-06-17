import { Album } from "../albums/albums.interfaces";
import { Cover, CoverPlaylist, SocialLink, Video } from "../common";
import { Track } from "../tracks/tracks.interfaces";

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

export interface ArtistPlaylist {
	uid: number;
	kind: number;
	title: string;
	description: string;
	descriptionFormatted: string;
	cover: CoverPlaylist;
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

export interface ArtistBriefInfo {
	artist: ArtistAddon;
	albums: Array<Album>;
	alsoAlbums: Array<Album>;
	lastReleaseIds: Array<number>;
	popularTracks: Array<Track>;
	similarArtists: Array<Track>;
	allCovers: Array<Cover>;
	concerts: Array<any>;
	videos: Array<Video>;
	vinyls: Array<any>;
	hasPromotions: false;
	lastReleases: Array<Track>;
	backgroundVideoUrl: string;
	playlistIds: Array<{ uid: number; kind: number }>;
	playlists: Array<ArtistPlaylist>;
}

export interface ArtistDirectAlbums {
	pager: {
		page: number;
		perPage: number;
		total: number;
	};
	albums: Array<Album>;
}
