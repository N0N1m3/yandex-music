import { YandexMusicClient } from "../../client";

import { log } from "../../decorators/log.decorator";

import { Difference } from "./diff.playlist";

import {Union, List, PlaylistInterface, PlaylistsRecommendations } from "../../interfaces";

type tracks = Array<{ id: string; albumId: string }>

export class Playlists {
	constructor(private readonly client: YandexMusicClient) {}

	/**
	 * Getting a playlist or playlist list by unique identifiers.
	 * @param {Union} id The unique ID of the user who owns the playlist.
	 * @param {List} kind The unique ID of the playlist or a list of them.
	 * @returns Playlist List.
	 */
	@log()
	public async get(id: Union, kind: List): Promise<Array<PlaylistInterface>> {
		const params = { kinds: kind.toString() };
		const playlists = await this.client.request.get<Array<PlaylistInterface>>(`/users/${id}/playlists`, params);
		return playlists.filter((playlist) => playlist?.owner !== undefined);
	}

	/**
	 * Getting a playlist or playlist list by unique identifiers.
	 * @param {Union} id The unique ID of the user who owns the playlist.
	 * @param {Union} kind The unique ID of the playlist.
	 * @returns Playlist List.
	 */
	@log()
	public async recommendations(id: string, kind: Union): Promise<Array<PlaylistsRecommendations>> {
		return await this.client.request.get<Array<PlaylistsRecommendations>>(`/users/${id}/playlists/${kind}/recommendations`);
	}

	/**
	 * Creating a playlist.
	 * @param {Union} id The unique ID of the owner.
	 * @param {string} title The title of playlist.
	 * @param {string} visibility Access modifier.
	 * @returns New Playlist.
	 */
	@log()
	public async create(id: Union, title: string, visibility: "public" | "private" = "public"): Promise<PlaylistInterface> {
		const params = { title, visibility };
		return await this.client.request.post<PlaylistInterface>(`/users/${id}/playlists/create`, null, params);}

	/**
	 * Deleting a playlist
	 * @param {Union} id The unique ID of the owner.
	 * @param {Union} kind The unique ID of the playlist.
	 * @returns OK in success
	 */
	@log()
	public async delete(id: Union, kind: Union): Promise<string> {
		return await this.client.request.post<string>(`/users/${id}/playlists/${kind}/delete`);
	}

	/**
	 * Renaming a playlist
	 * @param {Union} id The unique ID of the owner.
	 * @param {Union} kind The unique ID of the playlist.
	 * @param {string} value New name.
	 * @returns OK in success
	 */
	@log()
	public async name(id: Union, kind: Union, value: string): Promise<string> {
		return await this.client.request.post<string>(`/users/${id}/playlists/${kind}/name`, null, { value });
	}

	/**
	 * Changing the visibility of the playlist.
	 * @param {Union} id The unique ID of the owner.
	 * @param {Union} kind The unique ID of the playlist.
	 * @param {string} value New visibility.
	 * @returns OK in success
	 */
	@log()
	public async visibility(id: Union, kind: Union, value: "public" | "private" = "public"): Promise<string> {
		return await this.client.request.post<string>(`/users/${id}/playlists/${kind}/visibility`, null, { value });
	}

	/**
	 * Getting a playlists.
	 * @param {Union} id The unique ID of the user who owns the playlist.
	 * @returns Playlist List.
	 */
	@log()
	public async list(id: Union): Promise<Array<PlaylistInterface>> {
		return await this.client.request.get<Array<PlaylistInterface>>(`/users/${id}/playlists/list`);
	}

	/**
	 * Changing the playlist.
	 * @param {Union} id The unique ID of the user who owns the playlist.
	 * @param {Union} kind The unique ID of the playlist.
	 * @param {string} diff JSON representations of the differences between the old and new playlist.
	 * @param {number} revision Album Revision.
	 * @returns Modified playlist.
	 */
	@log()
	private async change(id: Union, kind: Union, diff: string, revision: number = 1): Promise<Omit<PlaylistInterface, "tracks">> {
		const params = { kind: kind, revision: revision, diff: '"' + diff + '"' };
		return await this.client.request.post<any>(`/users/${id}/playlists/${kind}/change`, null, params);
	}

	/**
	 * Adding a track to a playlist.
	 * @param {Union} id The unique ID of the user who owns the playlist.
	 * @param {Union} kind The unique ID of the playlist.
	 * @param {tracks} tracks Array of tracks
	 * @param {number} at Index to insert.
	 * @param {number} revision Album Revision.
	 * @returns Modified playlist.
	 */
	@log()
	public async insert(id: Union, kind: Union, tracks: tracks, at: number = 0, revision: number = 1): Promise<Omit<PlaylistInterface, "tracks">> {
		const operation = Difference.insert(at, tracks);
		return await this.change(id, kind, operation, revision);
	}

	/**
	 *
	 * @param {Union} id The unique ID of the user who owns the playlist.
	 * @param {Union} kind The unique ID of the playlist.
	 * @param {number} from From which index.
	 * @param {number} to By what index.
	 * @param {number} revision Album Revision.
	 * @returns Modified playlist.
	 */
	@log()
	public async remove(id: Union, kind: Union, from: number, to: number, revision: number = 1): Promise<Omit<PlaylistInterface, "tracks">> {
		const operation = Difference.delete(from, to);
		return await this.change(id, kind, operation, revision);
	}
}
