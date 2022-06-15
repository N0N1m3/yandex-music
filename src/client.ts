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

export class YandexMusicClient {
	private readonly url: string = "https://api.music.yandex.net:443";

	public readonly request: Requset;

	public readonly account: Account;
	public readonly track: Track;
	public readonly artist: Artist
	public readonly users: Users

	constructor(
		public readonly token: string,
		public readonly uid: number,
		public readonly lang: keyof typeof Languages,
	) {
		this.request = new Requset(this, this.url);

		this.request.setAuthorization();
		this.request.setLanguage(this.lang);

		this.account = new Account(this);
		this.track = new Track(this)
		this.artist = new Artist(this)
		this.users = new Users(this)
	}

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
	public async cover (uri: string, size: CoverSize): Promise<Buffer> {
		return await this.request.directLink<Buffer>(`https://${uri.replace("%%", size)}`, null)
	}

	/**
	 * Loading the track video.
	 * @param {string} url Video uri
	 * @returns Buffer
	 */
	public async video (url: string): Promise<Buffer> {
		return await this.request.directLink<Buffer>(url, null)
	}

	/**
	 * Getting genres of music.
	 * @returns Genres of music
	 */
	 public async genres (url: string): Promise<Array<Genre>> {
		return await this.request.get<Array<Genre>>(url)
	}
}
