import { YandexMusicClient } from "../client";

import { log } from "../decorators/log.decorator";

import { Radio } from "./radio";

import { Track } from "./track";

import { RotorDashboard, RotorList, RotorStatus, RotorTracks, Union } from "../interfaces";

type FeedbackType = "radioStarted" | "trackStarted" | "trackFinished" | "skip";

type energy = "fun" | "active" | "calm" | "sad" | "all";

type diver = "favorite" | "popular" | "discover" | "default";

type lang = "not-russian" | "russian" | "any";

type settings = "rotor" | "generative"

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
	public async status(): Promise<RotorStatus> {
		return await this.client.request.get<RotorStatus>("/rotor/account/status");
	}

	/**
	 * Getting the recommended stations of the current user.
	 * @returns Recommended stations.
	 */
	@log()
	public async dashboard(): Promise<RotorDashboard> {
		return await this.client.request.get<RotorDashboard>("/rotor/stations/dashboard");
	}

	/**
	 * Getting all radio stations with user settings.
	 * @returns Stations.
	 */
	@log()
	public async list(): Promise<Array<RotorList>> {
		return await this.client.request.get<Array<RotorList>>("/rotor/stations/list");
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
	public async info(station: string): Promise<RotorList> {
		return await this.client.request.get<RotorList>(`/rotor/station/${station}/info`);
	}

	/**
	 * Changing the settings of a specific station.
	 * @param {string} station Station.
	 * @param {energy} moodEnergy Mood.
	 * @param {diver} diversity The type of tracks.
	 * @param {lang} language Language.
	 * @param {settings} type Type.
	 * @returns OK if the request is successful.
	 */
	@log()
	public async settings(station: string, moodEnergy: energy, diversity: diver, language: lang = "any", type: settings = "rotor"): Promise<string> {
		const data = { moodEnergy, diversity, type, language }
		return await this.client.request.post<string>(`/rotor/station/${station}/settings3`, data);
	}

	/**
	 * Sending a response to what is happening when listening to the radio.
	 * @param {string} station Station
	 * @param {FeedbackType} type Type of feedback being sent: "radioStarted", "trackStarted", "trackFinished", "skip".
	 * @param {string} from Where the radio playback started from.
	 * @param {string} batch_id Unique identifier of the batch of tracks. Returned when receiving tracks.
	 * @param {number} totalPlayedSeconds How many seconds of the track were played before the action.
	 * @param {Union} trackId The unique ID of the track.
	 * @returns OK if the request is successful.
	 */
	@log()
	public async feedback(station: string, type: FeedbackType, from: string, batch_id: string, totalPlayedSeconds: number = 0, trackId: Union = "0"): Promise<string> {
		const timestamp = Date.now();

		let params = {};

		let data: Record<string, any> = { type, timestamp };

		if (batch_id) params = { "batch-id": batch_id };

		if (trackId) data = { ...data, trackId };

		if (from) data = { ...data, from };

		if (totalPlayedSeconds) data = { ...data, totalPlayedSeconds };

		return await this.client.request.post<string>(`/rotor/station/${station}/feedback`, data, params);
	}
}
