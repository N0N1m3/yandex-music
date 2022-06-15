export interface NewPlaylistsInterface {
	id: string;
	type: string;
	typeForFrom: string;
	title: string;
	newPlaylists: Array<{ uid: number; kind: number }>;
}
