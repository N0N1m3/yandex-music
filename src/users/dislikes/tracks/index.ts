import { DisLikes } from "..";

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
	constructor(private readonly dislikes: DisLikes) {}

	/**
	 * Mark "Do not recommend" to the track/tracks.
	 * @param {number | Array<number>} ids The unique identifier of the track or tracks.
	 * @param {string} user_id Unique user ID.
	 * @returns OK if the request is successful.
	 */
	@log()
	public async add(ids: number | Array<number>, user_id: number = this.dislikes.client.uid): Promise<string> {
		return await this.dislikes.action(ids, false, user_id);
	}

	/**
	 * Remove "Do not recommend" from the track/tracks.
	 * @param {number | Array<number>} ids The unique identifier of the track or tracks.
	 * @param {string} user_id Unique user ID.
	 * @returns OK if the request is successful.
	 */
	@log()
	public async remove(ids: number | Array<number>, user_id: number = this.dislikes.client.uid): Promise<string> {
		return await this.dislikes.action(ids, true, user_id);
	}

  /**
   * Getting tracks marked "Do not recommend".
   * @param {number} user_id Unique user ID.
   * @returns Tracks.
   */
  @log()
  public async get(user_id: number = this.dislikes.client.uid): Promise<TracksGet> {
    return await this.dislikes.client.request.get<TracksGet>(`/users/${user_id}/dislikes/tracks`);
  }
}