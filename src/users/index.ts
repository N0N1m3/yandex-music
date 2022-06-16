import { YandexMusicClient } from "../client";

import { log } from "../decorators/log.decorator";

import { DisLikes } from "./dislikes";

import { Likes } from "./likes";

import { Playlists } from "./playlist";

export class Users {
	public readonly playlists: Playlists;
	public readonly likes: Likes
	public readonly dislikes: DisLikes

	constructor(private readonly client: YandexMusicClient) {
		this.playlists = new Playlists(client);
		this.likes = new Likes(client)
		this.dislikes = new DisLikes(client)
	}
}
