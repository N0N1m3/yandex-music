import { Likes } from "..";

import { log } from "../../../decorators/log.decorator";

import { List } from "../../../common";

import { Album } from "../../../interfaces";

interface AlbumsGet {
	id: number;
	timestamp: string;
}

interface AlbumsRich {
	album: Album;
	timestamp: string;
}

export class Albums {
	constructor(private readonly likes: Likes) {}

	/**
	 * Mark "I like" the album/albums.
	 * @param {List} ids The unique identifier of the album or albums.
	 * @param {string} user_id Unique user ID.
	 * @returns OK if the request is successful.
	 */
	@log()
	public async add(ids: List, user_id: number = this.likes.client.uid): Promise<string> {
		return await this.likes.action("album", ids, false, user_id);
	}

	/**
	 * Remove the "I like" mark from the album/albums.
	 * @param {List} ids The unique identifier of the album or albums.
	 * @param {string} user_id Unique user ID.
	 * @returns OK if the request is successful.
	 */
	@log()
	public async remove(ids: List, user_id: number = this.likes.client.uid): Promise<string> {
		return await this.likes.action("album", ids, true, user_id);
	}

	/**
	 * Getting albums marked "I like".
	 * @param {number} user_id Unique user ID.
	 * @returns Short albums info.
	 */
	@log()
	public async get(user_id: number = this.likes.client.uid) {
		return await this.likes.get<Array<AlbumsGet>>("album", user_id, {'rich': "false"})
	}
	
	/**
	 * Getting albums marked "I like".
	 * @param {number} user_id Unique user ID.
	 * @returns Rich albums info.
	 */
	@log()
	public async rich(user_id: number = this.likes.client.uid) {
		return await this.likes.get<Array<AlbumsRich>>("album", user_id, {'rich': "true"})
	}
}
