import { Rotor } from "..";

import { log } from "../../decorators/log.decorator";

export class Radio {
	constructor(private readonly rotor: Rotor) {}

	/**
	 * @param {string} station Station.
	 * @param {string} from Where the radio playback started from.
	 * @param {string} batch_id Unique identifier of the batch of tracks. Returned when receiving tracks.
	 * @returns Ok if the request is successful
	 */
	@log()
	public async started(station: string, from: string, batch_id: string): Promise<string> {
		return await this.rotor.feedback(station, "radioStarted", from, batch_id);
	}
}
