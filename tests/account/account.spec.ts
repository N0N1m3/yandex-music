import { expect } from "chai";

import { YandexMusicClient } from "../../src";

import { token } from "../token";

import { AccountSettings, AccountStatus } from "./__mock__";

describe("Account tests", () => {
	const client = new YandexMusicClient(token, "ru");

	describe("Account status tests", () => {
		it("Should return account status", async () => {
			const status = await client.account.status();

			let account_status = AccountStatus;
			account_status["account"]["now"] = status["account"]["now"];

			expect(status).to.be.deep.equal(account_status);
		});
	});

	describe("Account settings tests", () => {
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
