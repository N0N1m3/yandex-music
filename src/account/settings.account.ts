export interface AccountSettings {
	uid: number;
	lastFmScrobblingEnabled: boolean;
	facebookScrobblingEnabled: boolean;
	shuffleEnabled: boolean;
	addNewTrackOnPlaylistTop: boolean;
	volumePercents: number;
	userMusicVisibility: "PUBLIC" | "PRIVATE";
	userSocialVisibility: "PUBLIC" | "PRIVATE";
	adsDisabled: boolean;
	modified: string;
	rbtDisabled: boolean;
	theme: "white" | "black" | "default";
	promosDisabled: boolean;
	autoPlayRadio: boolean;
	syncQueueEnabled: boolean;
	childModEnabled: boolean;
}


export interface AccountSettingsUpdate {
  userMusicVisibility: "PUBLIC" | "PRIVATE";
	userSocialVisibility: "PUBLIC" | "PRIVATE";
	theme: "white" | "black" | "default";
}