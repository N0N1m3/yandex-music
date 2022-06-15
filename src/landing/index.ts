import { YandexMusicClient } from "../client";

import { log } from "../decorators/log.decorator";

import { ChartInterface } from "./chart.landing";

import { LandingInterface } from "./get.landing";

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
}
