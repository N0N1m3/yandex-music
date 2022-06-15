import { YandexMusicClient } from "../client";

import { log } from "../decorators/log.decorator";

import { FeedInterface } from "./get.feed";

export class Feed {
	constructor(private readonly client: YandexMusicClient) {}
  
  /**
	 * Getting a stream of information (feed) tailored to the user. Contains smart playlists.
	 * @returns Smart user Playlists.
	 */
	@log()
	public async feed(): Promise<FeedInterface> {
		return await this.client.request.get<FeedInterface>(`/feed`);
	}

  /**
	 * @returns True or false
	 */
	@log()
	public async wizard(): Promise<{isWizardPassed: boolean}> {
		return await this.client.request.get<{isWizardPassed: boolean}>(`/feed/wizard/is-passed`);
	}
}