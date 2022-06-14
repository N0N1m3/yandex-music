export type TrackDownloadInfo = Array<DownloadInfo>;

export interface DownloadInfo {
	codec: "mp3" | "aac";
	gain: boolean;
	preview: boolean;
	downloadInfoUrl: string;
	direct: boolean;
	bitrateInKbps: 32 | 96 | 128 | 160 | 192 | 256 | 320;
}

export interface DownloadUrl {
	s: string;
	ts: string;
	path: string;
	host: string;
}
