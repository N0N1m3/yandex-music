import { expect } from "chai";

import { AccountSettings, AccountStatus } from "./__mock__";

import { YandexMusicClient } from "../../src";

import { token } from "../token";

let client: YandexMusicClient;

before(async () => {
	const config = await YandexMusicClient.get({
		auth: { type: "TOKEN", token },
		language: "ru",
	});

	client = new YandexMusicClient(config.token, config.uid, config.language);
});

describe("Account tests", () => {
	describe("Account status tests", () => {
		it("Should return account status", async () => {
			const status = await client.account.status();

			let account_status = AccountStatus;
			account_status["account"]["now"] = status["account"]["now"];

			expect(status).to.be.deep.equal(account_status);
		});
	});

	describe("Account settings tests", async () => {
		beforeEach(async () => {
			await client.account.update({
				userMusicVisibility: "PUBLIC",
				userSocialVisibility: "PUBLIC",
				theme: "default",
			});
		});

		it("Should return default settings of yandex music account", async () => {
			const settings = await client.account.settings();

			const account_settings = AccountSettings;
			account_settings["modified"] = settings["modified"];

			expect(settings).to.be.deep.equal(account_settings);
		});

		it("Should return update to private settings of yandex music account", async () => {
			const settings = await client.account.update({
				userMusicVisibility: "PRIVATE",
				userSocialVisibility: "PRIVATE",
			});

			const account_settings = AccountSettings;
			account_settings["modified"] = settings["modified"];
			account_settings["userMusicVisibility"] = "PRIVATE";
			account_settings["userSocialVisibility"] = "PRIVATE";

			expect(settings).to.be.deep.equal(account_settings);
		});

		it("Should return update to black theme settings of yandex music account", async () => {
			const settings = await client.account.update({ theme: "black" });

			const account_settings = AccountSettings;
			account_settings["modified"] = settings["modified"];
			AccountSettings["userMusicVisibility"] = "PUBLIC";
			AccountSettings["userSocialVisibility"] = "PUBLIC";
			account_settings["theme"] = "black";

			expect(settings).to.be.deep.equal(account_settings);
		});

		it("Should return update to white theme and 1 public setting of yandex music account", async () => {
			const settings = await client.account.update({
				theme: "white",
				userMusicVisibility: "PRIVATE",
			});

			const account_settings = AccountSettings;
			account_settings["modified"] = settings["modified"];
			account_settings["userMusicVisibility"] = "PRIVATE";
			account_settings["theme"] = "white";

			expect(settings).to.be.deep.equal(account_settings);
		});
	});
});
