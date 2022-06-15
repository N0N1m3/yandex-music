import { YandexMusicClient } from "../client";

import { log } from "../decorators/log.decorator";

import { Artist as ArtistInterface } from "../interfaces";

import { list } from "../utils";
import { ArtistBriefInfo } from "./brief-info.artist";
import { ArtistDirectAlbums } from "./direct-albums.artist";

export class Artist {
	constructor(private readonly client: YandexMusicClient) {}

	/**
	 * Getting the artist/artists.
	 * @param {number | Array<number>} ids The unique identifier of the artist or artists.
	 * @returns Artist or Artists.
	 */
	@log()
	public async get(ids: number | Array<number>): Promise<Array<ArtistInterface>> {
		const [url, params] = list("artist", ids);
		return await this.client.request.get<Array<ArtistInterface>>(url, params);
	}

  /**
	 * Getting information about the artist.
	 * @param {number} id The unique identifier of the artist.
	 * @returns Information about the artist.
	 */
	@log()
	public async info(id: number): Promise<ArtistBriefInfo> {
		return await this.client.request.get<ArtistBriefInfo>(`/artists/${id}/brief-info`);
	}

  /**
	 * Getting artist albums.
	 * @param {number} id The unique identifier of the artist.
   * @param {number} page Page number.
   * @param {number} page_size The number of albums per page.
   * @param {string} sort_by Parameter for sorting.
	 * @returns Artist's Album list page.
	 */
	@log()
	public async albums(id: number, page = 0, page_size = 0, sort_by = "year"): Promise<ArtistDirectAlbums> {
    const params = {page, page_size, sort_by}
		return await this.client.request.get<ArtistDirectAlbums>(`/artists/${id}/direct-albums`, params);
	}
}
