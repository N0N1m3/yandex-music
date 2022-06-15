import { expect } from "chai";

import { OneTrack, SimilarTracks, SupplementWithLyrics, SupplementWithoutLyrics, TwoTracks } from "./__mock__";

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

describe("Track tests", () => {
	describe("Supplement tracks", () => {
		it("Should return supplement track with lyrics", async () => {
			const supplement = await client.track.supplement("67155218");

			expect(supplement).to.be.deep.equal(SupplementWithLyrics);
		});

		it("Should return supplement track without lyrics", async () => {
			const supplement = await client.track.supplement("55251399");

			expect(supplement).to.be.deep.equal(SupplementWithoutLyrics);
		});
	});

	describe("Similar tracks to track", () => {
		it("Should return similar tracks to track", async () => {
			const similar = await client.track.similar("67155218");

			similar["similarTracks"].forEach(track => track["storageDir"] = "");
			similar["track"]["storageDir"] = "";

      SimilarTracks['track']['albums'][0]['likesCount'] = similar['track']['albums'][0]['likesCount']

			expect(similar["similarTracks"][8]).to.be.deep.equal(SimilarTracks["similarTracks"][8]);
		});

		it("Should return 10 simillar tracks to track", async () => {
			const similar = await client.track.similar("67155218");

			expect(similar["similarTracks"]).to.be.length(10);
		});
	});

	describe("Get tracks", () => {
		it("Should get one track", async () => {
			const track = await client.track.get(67155218);

      OneTrack[0]['albums'][0]['likesCount'] = track[0]['albums'][0]['likesCount']

			expect(track).to.be.deep.equal(OneTrack);
		});

		it("Should get two track", async () => {
			const track = await client.track.get([67155218, 55251399]);

      track.forEach((track, i) => TwoTracks[i]['albums'][0]['likesCount'] = track['albums'][0]['likesCount'])

			expect(track).to.be.deep.equal(TwoTracks);
		});
	});
});
