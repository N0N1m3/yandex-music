import { YandexMusicClient } from "../client";

import { log } from "../decorators/log.decorator";

import { Landing as LandingInterface } from "../interfaces";

import { Chart, NewPlaylists, NewRealeses, Podcast } from "../interfaces";

type block =
	| "personalplaylists"
	| "promotions"
	| "new-releases"
	| "new-playlists"
	| "mixes"
	| "chart"
	| "artists"
	| "albums"
	| "playlists"
	| "play_contexts";

export class Landing {
	constructor(private readonly client: YandexMusicClient) {}

	/**
	 * Getting a landing page containing blocks with new releases, charts, playlists with new products, etc.
	 * @param {block} blocks A block or a list of blocks required for issuing.
	 * @returns Landing page.
	 */
	@log()
	public async get(blocks: block): Promise<LandingInterface> {
		const params = { blocks };
		return await this.client.request.get<LandingInterface>(`/landing3`, params);
	}
  
  /**
	 * Getting the chart.
	 * @returns Chart.
	 */
	@log()
	public async chart(): Promise<Chart> {
		return await this.client.request.get<Chart>(`/landing3/chart`);
	}
  
  /**
	 * Getting a complete list of all new releases (albums).
	 * @returns List of new albums.
	 */
	@log()
	public async releases(): Promise<NewRealeses> {
		return await this.client.request.get<NewRealeses>(`/landing3/new-releases`);
	}
  
  /**
	 * Getting a complete list of all new playlists.
	 * @returns A list of new playlists.
	 */
	@log()
	public async playlists(): Promise<NewPlaylists> {
		return await this.client.request.get<NewPlaylists>(`/landing3/new-playlists`);
	}
  
  /**
	 * Getting podcasts from the landing page.
	 * @returns List of podcasts.
	 */
	@log()
	public async podcasts(): Promise<Podcast> {
		return await this.client.request.get<Podcast>(`/landing3/podcasts`);
	}
}
