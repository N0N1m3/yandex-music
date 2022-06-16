import { YandexMusicClient } from "../../client";

import { log } from "../../decorators/log.decorator";

import { Tracks } from "./tracks";

export class DisLikes {
	public readonly tracks: Tracks;

	constructor(public readonly client: YandexMusicClient) {
		this.tracks = new Tracks(this);
	}

  /**
   * Actions marked "Do not recommend".
   * @param {number | Array<number>} ids 
   * @param {boolean} remove If True, then removes the mark, otherwise puts.
   * @param {number} user_id Unique user ID.
   * @returns OK if the request is successful.
   */
	@log()
	public async action(ids: number | Array<number>, remove: boolean = false, user_id: number = this.client.uid): Promise<string> {
		const action = remove ? "remove" : "add-multiple";
		const params = { "track-ids": ids };
		return await this.client.request.post<string>(`/users/${user_id}/dislikes/tracks/${action}`, null, params);
	}
}