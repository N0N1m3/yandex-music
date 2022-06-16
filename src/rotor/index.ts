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

	/**
	 * Getting all radio stations with user settings.
	 * @returns Stations.
	 */
	@log()
	public async list(): Promise<Array<RotorListInterface>> {
		return await this.client.request.get<Array<RotorListInterface>>("/rotor/stations/list");
	}

	/**
	 * Getting a chain of tracks of a certain station.
	 * @param {string} station Station.
	 * @returns Tracks.
	 */
	@log()
	public async tracks(station: string): Promise<RotorTracks> {
		return await this.client.request.get<RotorTracks>(`/rotor/station/${station}/tracks`);
	}
  
  /**
	 * Getting information about the station and user settings for it.
	 * @param {string} station Station.
	 * @returns Tracks.
	 */
	@log()
	public async info(station: string): Promise<RotorListInterface> {
		return await this.client.request.get<RotorListInterface>(`/rotor/station/${station}/info`);
	}
}
