import { YandexMusicClient } from "../client";

import { log } from "../decorators/log.decorator";

import { Artist as ArtistInterface } from "../interfaces";

import { list } from "../utils";
import { ArtistBriefInfo } from "./brief-info.artist";

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

  /**
	 * Getting information about the artist.
	 * @param {number} id The unique identifier of the artis.
	 * @returns Information about the artist.
	 */
	@log()
	public async info(id: number): Promise<ArtistBriefInfo> {
		return await this.client.request.get<ArtistBriefInfo>(`/artists/${id}/brief-info`);
	}
}
