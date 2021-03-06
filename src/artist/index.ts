import { YandexMusicClient } from "../client";

import { log } from "../decorators/log.decorator";

import { list } from "../utils";

import { Union, List, ArtistBriefInfo, ArtistDirectAlbums, ArtistInterface } from "../interfaces"

export class Artist {
	constructor(private readonly client: YandexMusicClient) {}

	/**
	 * Getting the artist/artists.
	 * @param {List} ids The unique identifier of the artist or artists.
	 * @returns Artist or Artists.
	 */
	@log()
	public async get(ids: List): Promise<Array<ArtistInterface>> {
		const [url, params] = list("artist", ids);
		return await this.client.request.get<Array<ArtistInterface>>(url, params);
	}

  /**
	 * Getting information about the artist.
	 * @param {Union} id The unique identifier of the artist.
	 * @returns Information about the artist.
	 */
	@log()
	public async info(id: Union): Promise<ArtistBriefInfo> {
		return await this.client.request.get<ArtistBriefInfo>(`/artists/${id}/brief-info`);
	}

  /**
	 * Getting artist albums.
	 * @param {Union} id The unique identifier of the artist.
   * @param {number} page Page number.
   * @param {number} page_size The number of albums per page.
   * @param {string} sort_by Parameter for sorting.
	 * @returns Artist's Album list page.
	 */
	@log()
	public async albums(id: Union, page: number = 0, page_size: number = 0, sort_by: string = "year"): Promise<ArtistDirectAlbums> {
    const params = {page, page_size, sort_by}
		return await this.client.request.get<ArtistDirectAlbums>(`/artists/${id}/direct-albums`, params);
	}
}
