import { YandexMusicClient } from "../client";

import { log } from "../decorators/log.decorator";

import { Radio } from "./radio";

import { Track } from "./track";

import { RotorTracks } from "./tracks.rotor";

import { RotorListInterface } from "./list.rotor";

import { RotorStatusInterface } from "./status.rotor";

import { RotorDashboardInterface } from "./dashboard.rotor";

type FeedbackType = "radioStarted" | "trackStarted" | "trackFinished" | "skip"

export class Rotor {
	public readonly radio: Radio;
	public readonly track: Track;

	constructor(private readonly client: YandexMusicClient) {
		this.radio = new Radio(this);
		this.track = new Track(this);
	}

	/**
	 * Getting the user status with additional fields.
	 * @returns User status with additional fields from the radio.
	 */
	@log()
	public async status(): Promise<RotorStatusInterface> {
		return await this.client.request.get<RotorStatusInterface>("/rotor/account/status");
	}

	/**
	 * Getting the recommended stations of the current user.
	 * @returns Recommended stations.
	 */
	@log()
	public async dashboard(): Promise<RotorDashboardInterface> {
		return await this.client.request.get<RotorDashboardInterface>("/rotor/stations/dashboard");
	}
}
