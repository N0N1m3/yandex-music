import { Rotor } from "..";

import { log } from "../../decorators/log.decorator";

import { Union } from "../../common";

export class Track {
	constructor(private readonly rotor: Rotor) {}

	/**
	 *
	 * @param {string} station Station.
	 * @param {Union} track_id The unique ID of the track.
	 * @param {number} total How many seconds of the track were played before the action.
	 * @param {string} batch_id Unique identifier of the batch of tracks. Returned when receiving tracks.
	 * @returns OK if the request is successful
	 */
	@log()
	public async started(station: string, track_id: Union, total: number = 0, batch_id: string): Promise<any> {
		return await this.rotor.feedback(station, "trackStarted", "", batch_id, total, track_id);
	}

	/**
	 *
	 * @param {string} station Station.
	 * @param {Union} track_id The unique ID of the track.
	 * @param {number} total How many seconds of the track were played before the action.
	 * @param {string} batch_id Unique identifier of the batch of tracks. Returned when receiving tracks.
	 * @returns OK if the request is successful
	 */
	@log()
	public async finished(station: string, track_id: Union, total: number = 0, batch_id: string): Promise<string> {
		return await this.rotor.feedback(station, "trackFinished", "", batch_id, total, track_id);
	}

	/**
	 *
	 * @param {string} station Station.
	 * @param {Union} track_id The unique ID of the track.
	 * @param {number} total How many seconds of the track were played before the action.
	 * @param {string} batch_id Unique identifier of the batch of tracks. Returned when receiving tracks.
	 * @returns OK if the request is successful
	 */
	@log()
	public async skip(station: string, track_id: Union, total: number = 0, batch_id: string): Promise<string> {
		return await this.rotor.feedback(station, "skip", "", batch_id, total, track_id);
	}
}
