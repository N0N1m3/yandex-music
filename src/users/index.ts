import { YandexMusicClient } from "../client";

import { log } from "../decorators/log.decorator";

import { Likes } from "./likes";

import { Playlists } from "./playlist";

export class Users {
	public readonly playlists: Playlists;
	public readonly likes: Likes

	constructor(private readonly client: YandexMusicClient) {
		this.playlists = new Playlists(client);
		this.likes = new Likes(client)
	}
}
