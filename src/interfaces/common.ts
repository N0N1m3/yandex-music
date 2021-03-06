export type Union = string | number;
export type List = Array<Union>;

export type Lad = { id: number; name: string };

export type CoverBase = { type: string; uri: string };

export type Cover = CoverBase & { prefix: string };

export type CoverPlaylist = CoverBase & {
	dir: string;
	version: string;
	custom: boolean;
};

export interface SocialLink {
	title: string;
	href: string;
	type: string;
	socialNetwork: string;
}

export interface Owner {
	uid: number;
	login: string;
	name: string;
	sex: string;
	verified: boolean;
}

export interface Video {
	title: string;
	cover: string;
	embedUrl: string;
	provider: string;
	providerVideoId: string;
}

interface InvocationInfo {
	hostname: string;
	"req-id": string;
	"exec-duration-mills": string;
}

export interface YandexMusicResponse<T> {
	invocationInfo: InvocationInfo;
	result: T;
}

export type CoverSize =
	| "100x100"
	| "200x200"
	| "400x400"
	| "500x500"
	| "1000x1000";