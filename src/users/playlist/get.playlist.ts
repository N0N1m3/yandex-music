import { PlaylistCover } from "../../interfaces";

export interface PlaylistInterface {
	owner: {
		uid: number;
		login: string;
		name: string;
		sex: string;
		verified: boolean;
	};
	playlistUuid: string;
	available: boolean;
	uid: number;
	kind: number;
	title: string;
	revision: number;
	snapshot: number;
	trackCount: number;
	visibility: string;
	collective: boolean;
	created: string;
	modified: string;
	isBanner: boolean;
	isPremiere: boolean;
	durationMs: number;
	cover: PlaylistCover;
	ogImage: string;
	tracks: Array<{ id: number; albumId: number; timestamp: string }>;
	tags: Array<any>;
}
