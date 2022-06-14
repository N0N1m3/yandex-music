import { YandexMusicClient } from "../client";

import { log } from "../decorators/log.decorator";

import { TrackSimilar } from "./similar.track";

import { TrackSupplement } from "./supplement.track";

export class Track {
	constructor(private readonly client: YandexMusicClient) {}
  
	/**
	 * Getting more information about the track.
	 * @param {string} id The unique ID of the track.
	 * @returns Additional information about the track.
	 */
	@log()
	public async supplement(id: string): Promise<TrackSupplement> {
		return await this.client.request.get<TrackSupplement>(`/tracks/${id}/supplement`);
	}

  /**
	 * Getting similar tracks.
	 * @param {string} id The unique ID of the track.
	 * @returns Similar tracks to the track..
	 */
	@log()
	public async similar(id: string): Promise<TrackSimilar> {
		return await this.client.request.get<TrackSimilar>(`/tracks/${id}/similar`);
	}
}