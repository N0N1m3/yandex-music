import { Likes } from "..";

import { log } from "../../../decorators/log.decorator";

import { Track } from "../../../interfaces";

interface TracksGet {
	library: {
		uid: number,
		revision: number,
		playlistUuid: string,
		tracks: Array<Track>
	}
}

export class Tracks {
	constructor(private readonly likes: Likes) {}

	/**
	 * Mark "I like" the track/tracks.
	 * @param {number | Array<number>} ids The unique identifier of the track or tracks.
	 * @param {string} user_id Unique user ID.
	 * @returns OK if the request is successful.
	 */
	@log()
	public async add(ids: number | Array<number>, user_id: number = this.likes.client.uid): Promise<string> {
		return await this.likes.action("track", ids, false, user_id);
	}

	/**
	 * Remove the "I like" mark from the track/tracks.
	 * @param {number | Array<number>} ids The unique identifier of the track or tracks.
	 * @param {string} user_id Unique user ID.
	 * @returns OK if the request is successful.
	 */
	@log()
	public async remove(ids: number | Array<number>, user_id: number = this.likes.client.uid): Promise<string> {
		return await this.likes.action("track", ids, true, user_id);
	}

	/**
	 * Getting tracks marked "I like".
	 * @param {number} user_id Unique user ID.
	 * @returns Tracks info.
	 */
	@log()
	public async get(user_id: number = this.likes.client.uid) {
		return await this.likes.get<Array<TracksGet>>("track", user_id)
	}
}
