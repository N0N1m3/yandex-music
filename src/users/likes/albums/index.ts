import { Likes } from "..";

import { log } from "../../../decorators/log.decorator";

export class Albums {
	constructor(private readonly likes: Likes) {}

	/**
	 * Mark "I like" the album/albums.
	 * @param {number | Array<number>} ids The unique identifier of the album or albums.
	 * @param {string} user_id Unique user ID.
	 * @returns OK if the request is successful.
	 */
	@log()
	public async add(ids: number | Array<number>, user_id: number = this.likes.client.uid): Promise<string> {
		return await this.likes.action("album", ids, false, user_id);
	}

	/**
	 * Remove the "I like" mark from the album/albums.
	 * @param {number | Array<number>} ids The unique identifier of the album or albums.
	 * @param {string} user_id Unique user ID.
	 * @returns OK if the request is successful.
	 */
	@log()
	public async remove(ids: number | Array<number>, user_id: number = this.likes.client.uid): Promise<string> {
		return await this.likes.action("album", ids, true, user_id);
	}
}
