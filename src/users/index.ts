import { YandexMusicClient } from "../client";

import { log } from "../decorators/log.decorator";

import { Playlists } from "./playlist";

export class Users {
	public readonly playlists: Playlists;

	constructor(private readonly client: YandexMusicClient) {
		this.playlists = new Playlists(client);
	}
}
