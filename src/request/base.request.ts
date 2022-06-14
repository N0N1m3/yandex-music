import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
} from "axios";

import { URLSearchParams as qs } from "url";

import { YandexMusicClient } from "../client";

import {
	BadRequestError,
	NetworkError,
	NotFoundError,
	UnauthorizedError,
	YandexMusicError,
} from "../exceptions";

import { YandexMusicResponse } from "../interfaces";

export enum Languages {
	en = "en",
	uz = "uz",
	uk = "uk",
	us = "us",
	ru = "ru",
	kk = "kk",
	hy = "hy",
}

type data = Record<string, any> | null;

type method = "GET" | "POST" | "DIRECT_LINK";

export class Requset {
	protected readonly axios: AxiosInstance;
	protected _headers: Map<string, any> = new Map<string, any>();

	constructor(
		protected readonly client: YandexMusicClient,
		protected readonly url: string,
	) {
		this.axios = axios.create({ baseURL: this.url });
		this._headers.set("X-Yandex-Music-Client", "YandexMusicAndroid/23020251");
		this._headers.set("User-Agent", "Yandex-Music-API");
	}
	/**
	 * @returns {Map<string, any>} Headers from the request client class
	 */
	public get headers(): Map<string, any> {
		return this._headers;
	}

	/**
	 * Add language header for each requset.
	 * @param {Languages} lang Avlibale variants: en/uz/uk/us/ru/kk/hy.
	 * @returns {void} Void functions that set header.
	 */
	public setLanguage(lang: keyof typeof Languages = "ru"): void {
		this._headers.set("Accept-Language", lang);
	}

	/**
	 * Add token header for each requset.
	 * @returns {void} Void functions that set header.
	 */
	public setAuthorization(): void {
		this._headers.set("Authorization", `OAuth ${this.client?.token}`);
	}

	/**
	 * Throws the necessary exceptions, returns a response. Passes custom arguments to the request.
	 *
	 * @param {"GET" | "POST"} type HTTP request method ("GET" | "POST").
	 * @param {string} url Url for the request.
	 * @param {data} data Search and additional date for the post request.
	 * @param {data} params Search and additional params for the all requests.
	 * @returns {Promise<T>} Data from the yandex music api.
	 *
	 * @throws UnauthorizedError, when token is invalid, or a long wait for a direct link to the file.
	 * @throws BadRequestError, when the request is incorrect.
	 * @throws NotFoundError, when the page is not found
	 * @throws NetworkError, when there are problems with the network
	 */
	private async wrapper<T>(
		type: method,
		url: string,
		data: data = null,
		params: data = null,
	): Promise<T> {
		let response!: AxiosResponse<YandexMusicResponse<T>>;
		const config: AxiosRequestConfig = {
			headers: Object.fromEntries(this._headers.entries()),
			params: params ? new qs(params) : null,
		};
		
		try {
			if (type === "GET") response = await this.axios.get<YandexMusicResponse<T>>(url, config);
			else if (type === "POST") response = await this.axios.post<YandexMusicResponse<T>>(url, data, config);
			else if (type === "DIRECT_LINK") return (await axios.get(url, config))['data']
		} catch (e) {
			if (e instanceof AxiosError) {
				const { message } = e;
				if (e.code === "401" || e.code === "403") throw new UnauthorizedError(message);
				else if (e.code === "400") throw new BadRequestError(message);
				else if (e.code === "404") throw new NotFoundError(message);
				else if (e.code === "409" || e.code === "413") throw new NetworkError(message);
				else if (e.code === "502") throw new NetworkError(message);
				else throw new NetworkError(`${message} (${e.code!}): ${e.stack ? e.stack : "No additional info"}`);
			} else throw new YandexMusicError(`Unknown HTTP error. ${e as any}`);
		}

		return response["data"]["result"];
	}

	public async get<T>(url: string, params: data = null): Promise<T> {
		return await this.wrapper<T>("GET", url, null, params);
	}

	public async post<T>(url: string, data: data = null, params: data = null): Promise<T> {
		return await this.wrapper<T>("POST", url, data, params);
	}

	public async directLink<T>(url: string, params: data): Promise<T> {
		console.log(url)
		return await this.wrapper<T>("DIRECT_LINK", url, null, params)
	}
}

export const baseClient = (url: string): AxiosInstance =>
	axios.create({ baseURL: url });
