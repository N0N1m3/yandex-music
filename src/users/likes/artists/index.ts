import { Likes } from "..";

import { log } from "../../../decorators/log.decorator";

export class Artists {
	constructor(private readonly likes: Likes) {}

	/**
	 * Mark "I like" the artist/artists.
	 * @param {number | Array<number>} ids The unique identifier of the artist or artists.
	 * @param {string} user_id Unique user ID.
	 * @returns OK if the request is successful.
	 */
	@log()
	public async add(ids: number | Array<number>, user_id: number = this.likes.client.uid): Promise<string> {
		return await this.likes.action("artist", ids, false, user_id);
	}

	/**
	* Remove the "I like" mark from the artist/artists.
	* @param {number | Array<number>} ids The unique identifier of the artist or artists.
	* @param {string} user_id Unique user ID.
	* @returns OK if the request is successful.
	*/
	@log()
	public async remove(ids: number | Array<number>, user_id: number = this.likes.client.uid): Promise<string> {
		return await this.likes.action("artist", ids, true, user_id);
	}
}
