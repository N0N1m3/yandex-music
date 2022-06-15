import { YandexMusicClient } from "../../client";

import { log } from "../../decorators/log.decorator";

import { PlaylistInterface } from "./get.playlist";

import { PlaylistsRecommendations } from "./recommendations.playlist";

export class Playlists {
	constructor(private readonly client: YandexMusicClient) {}

  /**
   * Getting a playlist or playlist list by unique identifiers.
   * @param {string} id The unique ID of the user who owns the playlist.
   * @param {number | Array<number>} kind The unique ID of the playlist or a list of them.
   * @returns Playlist List.
   */
	@log()
	public async get(id: string, kind: number | Array<number>): Promise<Array<PlaylistInterface>> {
		const params = { kinds: kind.toString() };
		const playlists = await this.client.request.get<Array<PlaylistInterface>>(`/users/${id}/playlists`, params);
		return playlists.filter((playlist) => playlist?.owner !== undefined);
	}
  
  /**
   * Getting a playlist or playlist list by unique identifiers.
   * @param {string} id The unique ID of the user who owns the playlist.
   * @param {number} kind The unique ID of the playlist.
   * @returns Playlist List.
   */
	@log()
	public async recommendations(id: string, kind: number): Promise<Array<PlaylistsRecommendations>> {
		return await this.client.request.get<Array<PlaylistsRecommendations>>(`/users/${id}/playlists/${kind}/recommendations`);
	}

  /**
   * Creating a playlist.
   * @param {string} id The unique ID of the owner.
   * @param {string} title The title of playlist.
   * @param {string} visibility Access modifier. 
   * @returns New Playlist.
   */
	@log()
	public async create(id: string, title: string, visibility: "public" | "private" = "public"): Promise<PlaylistInterface> {
		const params = { title, visibility };
		return await this.client.request.post<PlaylistInterface>(`/users/${id}/playlists/create`, null, params);
	}

  /**
   * Deleting a playlist
   * @param {string} id The unique ID of the owner.
   * @param {string} kind The unique ID of the playlist.
   * @returns OK in success
   */
	@log()
	public async delete(id: string, kind: string): Promise<string> {
		return await this.client.request.post<string>(`/users/${id}/playlists/${kind}/delete`);
	}
}
