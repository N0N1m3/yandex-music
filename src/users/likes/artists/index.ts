import { Likes } from "..";

import { log } from "../../../decorators/log.decorator";

import { Artist } from "../../../interfaces";

interface ArtistGet {
	artist: Artist;
	timestamp: string;
}

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

	/**
	 * Getting artists marked "I like".
	 * @param {number} user_id Unique user ID.
	 * @returns Short artists info.
	 */
	@log()
	public async get(user_id: number = this.likes.client.uid) {
		return await this.likes.get<Array<Artist>>("artist", user_id)
	}

	/**
	 * Getting artists marked "I like".
	 * @param {number} user_id Unique user ID.
	 * @returns Rich artists info.
	 */
	@log()
	public async with(user_id: number = this.likes.client.uid) {
		return await this.likes.get<Array<ArtistGet>>("artist", user_id, {'rich': "false"})
	}
}
