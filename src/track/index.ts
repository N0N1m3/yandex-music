import { YandexMusicClient } from "../client";

import { log } from "../decorators/log.decorator";

import { list } from "../utils";

import { TrackSimilar } from "./similar.track";

import { TrackSupplement } from "./supplement.track";

import { Track as TrackInterface } from "../interfaces";

export class Track {
	constructor(private readonly client: YandexMusicClient) {}

	/**
	 * Getting more information about the track.
	 * @param {string} id The unique ID of the track.
	 * @returns Additional information about the track.
	 */
	@log()
	public async supplement(id: string): Promise<TrackSupplement> {
		return await this.client.request.get<TrackSupplement>(
			`/tracks/${id}/supplement`
		);
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

	/**
	 * Getting the track/tracks.
	 * @param {number | Array<number>} ids The unique identifier of the track or tracks.
	 * @returns Track or Tracks.
	 */
	@log()
	public async get(ids: number | Array<number>) {
		const [url, params] = list("track", ids);
		return await this.client.request.get<TrackInterface>(url, params);
	}
}
