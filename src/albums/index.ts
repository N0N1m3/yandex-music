import { YandexMusicClient } from "../client";

import { log } from "../decorators/log.decorator";

import { list } from "../utils";

import { Union, List, AlbumInterface, AlbumWithTracks } from "../interfaces"

export class Albums {
	constructor(private readonly client: YandexMusicClient) {}

  /**
	 * Getting an album by its unique ID along with tracks.
   * @param {Union} id The unique ID of the album.
	 * @returns Album
	 */
	@log()
	public async with(id: Union): Promise<AlbumWithTracks> {
		return await this.client.request.get<AlbumWithTracks>(`/albums/${id}/with-tracks`);
	}

  /**
	 * Getting the album/albums.
	 * @param {List} ids The unique identifier of the album or albums.
	 * @returns Album or Albums.
	 */
	@log()
	public async get(ids: List): Promise<Array<AlbumInterface>> {
		const [url, params] = list("album", ids);
		return await this.client.request.get<Array<AlbumInterface>>(url, params);
	}
}
