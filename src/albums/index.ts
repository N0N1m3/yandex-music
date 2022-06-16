import { YandexMusicClient } from "../client";

import { log } from "../decorators/log.decorator";

import { list } from "../utils";

import { List, Union } from "../common";

import { Album } from "../interfaces";

import { AlbumWithTracksInterface } from "./with-tracks.albums";

export class Albums {
	constructor(private readonly client: YandexMusicClient) {}

  /**
	 * Getting an album by its unique ID along with tracks.
   * @param {Union} id The unique ID of the album.
	 * @returns Album
	 */
	@log()
	public async with(id: Union): Promise<AlbumWithTracksInterface> {
		return await this.client.request.get<AlbumWithTracksInterface>(`/albums/${id}/with-tracks`);
	}

  /**
	 * Getting the album/albums.
	 * @param {List} ids The unique identifier of the album or albums.
	 * @returns Album or Albums.
	 */
	@log()
	public async get(ids: List): Promise<Array<Album>> {
		const [url, params] = list("album", ids);
		return await this.client.request.get<Array<Album>>(url, params);
	}
}
