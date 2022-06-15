import { YandexMusicClient } from "../client";

import { log } from "../decorators/log.decorator";

import { list } from "../utils";

import { Album } from "../interfaces";

import { AlbumWithTracksInterface } from "./with-tracks.albums";

export class Albums {
	constructor(private readonly client: YandexMusicClient) {}

  /**
	 * Getting an album by its unique ID along with tracks.
   * @param {string} id The unique ID of the album.
	 * @returns Album
	 */
	@log()
	public async with(id: string): Promise<AlbumWithTracksInterface> {
		return await this.client.request.get<AlbumWithTracksInterface>(`/albums/${id}/with-tracks`);
	}

  /**
	 * Getting the album/albums.
	 * @param {number | Array<number>} ids The unique identifier of the album or albums.
	 * @returns Album or Albums.
	 */
	@log()
	public async get(ids: number | Array<number>): Promise<Array<Album>> {
		const [url, params] = list("album", ids);
		return await this.client.request.get<Array<Album>>(url, params);
	}
}
