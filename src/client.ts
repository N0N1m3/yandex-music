import { Languages, Requset as YandexMusicRequest } from "./request";

import { Account } from "./account";

export class YandexMusicClient {
	private readonly url: string = "https://api.music.yandex.net:443";

	public readonly request: YandexMusicRequest;
	public readonly account: Account;

	constructor(
		public readonly token: string,
		public readonly lang: keyof typeof Languages,
	) {
		this.request = new YandexMusicRequest(this, this.url);
		this.request.setAuthorization();
		this.request.setLanguage(lang);
		this.account = new Account(this);
	}
}
