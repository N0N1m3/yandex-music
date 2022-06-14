import { YandexMusicClient } from "../client";
import { log } from "../decorators/log.decorator";
import { Languages } from "../request";
import { AccountExperiments } from "./experiments.account";
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

	/**
	 * Getting the values of experimental account functions.
	 * @returns State of experimental functions.
	 */
	@log()
	public async experiments(): Promise<AccountExperiments> {
		return await this.client.request.post<AccountExperiments>("/account/experiments", null);
	}

	/**
	 * Activation of the promo code.
	 * @param {any} data  
	 * code: Promo code.
	 * 
	 * language: API response language in ISO 639-1.
	 * @returns Информация об активации промо-кода
	 */
	@log()
	public async promo(data: {code: any, language: keyof typeof Languages}): Promise<AccountExperiments> {
		return await this.client.request.post<AccountExperiments>("/account/consume-promo-code", null, data);
	}
}
