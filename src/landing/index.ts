import { YandexMusicClient } from "../client";

import { log } from "../decorators/log.decorator";

import { ChartInterface } from "./chart.landing";

import { LandingInterface } from "./get.landing";

import { PodcastInterface } from "./podcasts.landing";

import { NewRealesesInterface } from "./new-releases.landing";

import { NewPlaylistsInterface } from "./new-playlists.landing";

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
	public async chart(): Promise<ChartInterface> {
		return await this.client.request.get<ChartInterface>(`/landing3/chart`);
	}
  
  /**
	 * Getting a complete list of all new releases (albums).
	 * @returns List of new albums.
	 */
	@log()
	public async releases(): Promise<NewRealesesInterface> {
		return await this.client.request.get<NewRealesesInterface>(`/landing3/new-releases`);
	}
  
  /**
	 * Getting a complete list of all new playlists.
	 * @returns A list of new playlists.
	 */
	@log()
	public async playlists(): Promise<NewPlaylistsInterface> {
		return await this.client.request.get<NewPlaylistsInterface>(`/landing3/new-playlists`);
	}
  
  /**
	 * Getting podcasts from the landing page.
	 * @returns List of podcasts.
	 */
	@log()
	public async podcasts(): Promise<PodcastInterface> {
		return await this.client.request.get<PodcastInterface>(`/landing3/podcasts`);
	}
}
