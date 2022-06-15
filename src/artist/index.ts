import { YandexMusicClient } from "../client";

import { log } from "../decorators/log.decorator";

import { Artist as ArtistInterface } from "../interfaces";

import { list } from "../utils";

export class Artist {
	constructor(private readonly client: YandexMusicClient) {}

	/**
	 * Getting the artist/artists.
	 * @param {number | Array<number>} ids The unique identifier of the artist or artists.
	 * @returns Artist or Artists.
	 */
	@log()
	public async get(ids: number | Array<number>): Promise<Array<ArtistInterface>> {
		const [url, params] = list("artist", ids);
		return await this.client.request.get<Array<ArtistInterface>>(url, params);
	}
}
