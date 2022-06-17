import { CoverPlaylist, Owner } from "../common";

export interface PlaylistInterface {
	owner: Owner
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
	cover: CoverPlaylist;
	ogImage: string;
	tracks: Array<{ id: number; albumId: number; timestamp: string }>;
	tags: Array<any>;
}
