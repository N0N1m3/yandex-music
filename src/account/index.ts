import { YandexMusicClient } from "../client";
import { log } from "../decorators/log.decorator";
import { AccountSettings, AccountSettingsUpdate } from "./settings.account";
import { AccountStatus } from "./status.account";

export class Account {
	constructor(private readonly client: YandexMusicClient) {}

	/**
	 * Getting account status.
	 * @returns Account information if it is valid, otherwise null.
	 */
	@log()
	public async status(): Promise<AccountStatus> {
		return await this.client.request.get<AccountStatus>("/account/status");
	}

	/**
	 * Getting the current user's settings.
	 * @returns User settings if the account is valid, otherwise null.
	 */
	@log()
	public async settings(): Promise<AccountSettings> {
		return await this.client.request.get<AccountSettings>("/account/settings");
	}

	/**
	 * Changing the settings of the current user.
	 * @returns Updated user settings if the account is valid, otherwise null.
	 */
	@log()
	public async update(data: Partial<AccountSettingsUpdate>): Promise<AccountSettings> {
		return await this.client.request.post<AccountSettings>("/account/settings", null, data);
	}
}
