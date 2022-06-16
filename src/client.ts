import { URLSearchParams as qs } from "url";
import { AxiosInstance } from "axios";

import { baseClient, Languages, Requset } from "./request";

import { AccountStatus } from "./account/status.account";

import { CoverSize, YandexMusicResponse } from "./interfaces";

import { YandexMusicError } from "./exceptions";

import { Account } from "./account";
import { Track } from "./track";
import { Artist } from "./artist";
import { Genre } from "./genre";
import { Users } from "./users";
import { Landing } from "./landing";
import { Feed } from "./feed";
import { Albums } from "./albums";
import { Rotor } from "./rotor";
import { log } from "./decorators/log.decorator";

interface Config {
	auth: {
		type: "LOGIN" | "TOKEN";
		username?: string;
		password?: string;
		token?: string;
	};
	language: keyof typeof Languages;
}

interface Auth {
	access_token: string;
	expires_in?: number;
	token_type?: string;
	uid: number;
}

type Status = YandexMusicResponse<AccountStatus>;

interface Settings {
	inAppProducts: Array<any>,
	nativeProducts: Array<any>,
	webPaymentUrl: string,
	promoCodesEnabled: boolean
}

export class YandexMusicClient {
	private readonly url: string = "https://api.music.yandex.net:443";

	public readonly request: Requset;

	public readonly account: Account;
	public readonly track: Track;
	public readonly artist: Artist;
	public readonly users: Users;
	public readonly landing: Landing;
	public readonly feed: Feed;
	public readonly albums: Albums;
	public readonly rotor: Rotor;

	constructor(
		public readonly token: string,
		public readonly uid: number,
		public readonly lang: keyof typeof Languages
	) {
		this.request = new Requset(this, this.url);

		this.request.setAuthorization();
		this.request.setLanguage(this.lang);

		this.account = new Account(this);
		this.track = new Track(this);
		this.artist = new Artist(this);
		this.users = new Users(this);
		this.landing = new Landing(this);
		this.feed = new Feed(this);
		this.albums = new Albums(this);
		this.rotor = new Rotor(this);
	}

	@log()
	public static async get(config: Config) {
		const { auth } = config;
		const { username, password, token } = auth;

		const api: AxiosInstance = baseClient("https://api.music.yandex.net:443");
		const init: AxiosInstance = baseClient("https://oauth.yandex.ru:443");

		if (auth.type === "TOKEN" && token) {
			const headers = { Authorization: `OAuth ${token}` };
			const account = await api.get<Status>("/account/status", { headers });
			return {
				uid: account["data"]["result"]["account"]["uid"],
				language: config.language,
				token: token,
			};
		} else if (config.auth.type === "LOGIN" && username && password) {
			const headers = { "Content-Type": "application/x-www-form-urlencoded" };
			const params = new qs({
				grant_type: "password",
				client_id: "23cabbbdc6cd418abb4b39c32c41195d",
				client_secret: "53bc75238f0c4d08a118e51fe9203300",
				username: username,
				password: password,
			});

			const { data } = await init.post<Auth>("token", { headers, params });

			return {
				uid: data["uid"],
				language: config.language,
				token: data["access_token"],
			};
		} else throw new YandexMusicError("No auth crenditials provided");
	}

	/**
	 * Loading the track cover.
	 * @param {string} uri Image uri
	 * @param {CoverSize} size Image Size
	 * @returns Buffer
	 */
	@log()
	public async cover(uri: string, size: CoverSize): Promise<Buffer> {
		return await this.request.directLink<Buffer>(`https://${uri.replace("%%", size)}`, null);
	}

	/**
	 * Loading the track video.
	 * @param {string} url Video uri
	 * @returns Buffer
	 */
	@log()
	public async video(url: string): Promise<Buffer> {
		return await this.request.directLink<Buffer>(url, null);
	}

	/**
	 * Getting genres of music.
	 * @returns Genres of music
	 */
	@log()
	public async genres(url: string): Promise<Array<Genre>> {
		return await this.request.get<Array<Genre>>(url);
	}

	/**
	 * Receiving purchase offers. There are no required parameters.
	 * @returns Information about the products offered if the account is valid.
	 */
	@log()
	public async settings(): Promise<Settings> {
		return await this.request.get<Settings>("/settings");
	}

	/**
	 * A method for sending the current state of the track being listened to.
	 * @param {string} track_id The unique ID of the track.
	 * @param {string} from The name of the client from which the listening takes place.
	 * @param {string} album_id The unique ID of the album.
	 * @param {string} playlist_id The unique ID of the playlist, if one is being listened to.
	 * @param {boolean} from_cache Whether the track is played from the cache.
	 * @param {string} play_id The unique ID of the playback.
	 * @param {number} track_length_seconds Track duration in seconds.
	 * @param {number} total_played_seconds How many tracks were played in total in seconds.
	 * @param {number} end_position_seconds The final value of the seconds played.
	 * @returns OK if the request is successful.
	 */
	@log()
	public async play(
		track_id: string,
		from: string,
		album_id: string,
		playlist_id: string = "",
		from_cache: boolean = false,
		play_id: string = "",
		track_length_seconds: number = 0,
		total_played_seconds: number = 0,
		end_position_seconds: number = 0,
	): Promise<string> {

		const data = {
			"track-id": track_id,
			"from-cache": from_cache,
			from: from,
			"play-id": play_id,
			uid: this.uid,
			timestamp: new Date().toISOString(),
			"track-length-seconds": track_length_seconds,
			"total-played-seconds": total_played_seconds,
			"end-position-seconds": end_position_seconds,
			"album-id": album_id,
			"playlist-id": playlist_id,
			"client-now": new Date().toISOString(),
		};

		return await this.request.post<string>("/play-audio", null, data);
	}
}
