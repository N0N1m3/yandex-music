import { YandexMusicClient } from "../../client";

import { log } from "../../decorators/log.decorator";

import { PlaylistInterface } from "./get.playlist";

export class Playlists {
	constructor(private readonly client: YandexMusicClient) {}

  /**
   * Getting a playlist or playlist list by unique identifiers.
   * @param {string} id The unique ID of the user who owns the playlist.
   * @param {number | Array<number>} kind The unique ID of the playlist or a list of them.
   * @returns Playlist List.
   */
	@log()
	public async get(id: string, kind: number | Array<number>) {
		const params = { kinds: kind.toString() };
		const playlists = await this.client.request.get<Array<PlaylistInterface>>(`/users/${id}/playlists`, params);
		return playlists.filter((playlist) => playlist?.owner !== undefined);
	}
}
