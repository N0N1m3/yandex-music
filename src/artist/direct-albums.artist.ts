import { Album } from "../interfaces";

export interface ArtistDirectAlbums {
	pager: {
		page: number;
		perPage: number;
		total: number;
	};
	albums: Array<Album>;
}
