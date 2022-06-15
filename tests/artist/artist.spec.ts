import { expect } from "chai";

import { OneArtist, TwoArtists } from "./__mock__";

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

describe("Artist tests", () => {
	describe("Artist get tests", () => {
		it("Should return one artist by id", async () => {
			const artist = await client.artist.get(5781113);

			OneArtist[0]["counts"] = artist[0]["counts"];
			OneArtist[0]["ratings"] = artist[0]["ratings"];

			expect(artist).to.be.deep.equal(OneArtist);
		});

		it("Should return two artists by id", async () => {
			const artist = await client.artist.get([5781113, 6456325]);

			artist.forEach((artist, i) => {
				TwoArtists[i]["counts"] = artist["counts"];
				TwoArtists[i]["ratings"] = artist["ratings"];
			});

			expect(artist).to.be.deep.equal(TwoArtists);
		});
	});
});
