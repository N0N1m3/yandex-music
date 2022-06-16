import { YandexMusicClient } from "../../client";

import { log } from "../../decorators/log.decorator";

import { Albums } from "./albums";
import { Artists } from "./artists";
import { Playlists } from "./playlists";
import { Tracks } from "./tracks";

type action = "track" | "artist" | "playlist" | "album";

export class Likes {
	public readonly albums: Albums;
	public readonly artists: Artists;
	public readonly playlists: Playlists;
	public readonly tracks: Tracks;
	constructor(public readonly client: YandexMusicClient) {
		this.albums = new Albums(this);
		this.artists = new Artists(this);
		this.playlists = new Playlists(this);
		this.tracks = new Tracks(this);
	}

  /**
   * Actions marked "I like".
   * @param {action} type The type of the object.
   * @param {number | Array<number>} ids 
   * @param {boolean} remove If True, then removes the mark, otherwise puts.
   * @param {number} user_id Unique user ID.
   * @returns OK if the request is successful.
   */
	@log()
	public async action(type: action, ids: number | Array<number>, remove: boolean = false, user_id: number = this.client.uid): Promise<string> {
		const action = remove ? "remove" : "add-multiple";
		const params = { [`${type}-ids`]: ids };
		return await this.client.request.post<string>(`/users/${user_id}/likes/${type}s/${action}`, null, params);
	}

  /**
   * Getting objects marked "I like".
   * @param {action} type The type of the object.
   * @param {number} user_id Unique user ID.
   * @param {Record<string, any>} params Parameters to be passed to the request.
   * @returns Obj type.
   */
	@log()
	public async get<T>(type: action, user_id: number = this.client.uid, params: Record<string, any> = {}): Promise<T> {
		return await this.client.request.get<T>(`/users/${user_id}/likes/${type}s`, params);
	}
}
