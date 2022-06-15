import { createHash } from "crypto";

import { YandexMusicClient } from "../client";

import { log } from "../decorators/log.decorator";

import { list } from "../utils";

import { TrackSimilar } from "./similar.track";

import { TrackSupplement } from "./supplement.track";

import { Track as TrackInterface } from "../interfaces";

import { DownloadUrl, TrackDownloadInfo } from "./download-info.track";

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

	/**
	 * Getting the track/tracks.
	 * @param {number | Array<number>} ids The unique identifier of the track or tracks.
	 * @returns Track or Tracks.
	 */
	@log()
	public async get(ids: number | Array<number>): Promise<Array<TrackInterface>> {
		const [url, params] = list("track", ids);
		return await this.client.request.get<Array<TrackInterface>>(url, params);
	}

	/**
	 * Getting the track download info.
	 * @param {number} id The unique identifier of the track or tracks.
	 * @returns Track download info.
	 */
	@log()
	public async downloadInfo(id: number): Promise<TrackDownloadInfo> {
		return await this.client.request.get<TrackDownloadInfo>(
			`/tracks/${id}/download-info`,
		);
	}

	/**
	 * Getting the track download url.
	 * @param {string} url Track download info.
	 * @returns Track download url.
	 */
	@log()
	public async downloadUrl(url: string): Promise<string> {
		const info = await this.client.request.directLink<DownloadUrl>(url, {format: "json"});
    
		const trackUrl = `XGRlBW9FXlekgbPrRHuSiA${info.path.substring(1)}${info.s}`;

		const hashedUrl = createHash("md5").update(trackUrl).digest("hex");

		return `https://${info.host}/get-mp3/${hashedUrl}/${info.ts}${info.path}`;
	}
}
