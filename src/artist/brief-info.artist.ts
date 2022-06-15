import { Album, ArtistAddon, Cover, Playlist, Track, Video } from "../interfaces";

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
	playlists: Array<Playlist>;
}
