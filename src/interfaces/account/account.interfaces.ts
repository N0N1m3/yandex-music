export interface AccountExperiments {
	[key: string]: string;
}

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

export interface StatusBase {
	account: {
		now: string;
		uid: number;
		login: string;
		region: 225;
		fullName: string;
		secondName: string;
		firstName: string;
		displayName: string;
		serviceAvailable: boolean;
		hostedUser: boolean;
	};
	permissions: {
		until: string;
		values: Array<string>;
		default: Array<string>;
	};
	subscription: {
		hadAnySubscription: false;
		canStartTrial: false;
		mcdonalds: false;
	};
	subeditor: false;
	subeditorLevel: 0;
	pretrialActive: false;
}

export interface AccountStatus extends StatusBase {
	advertisement: string;
	masterhub: {
		activeSubscriptions: Array<any>;
		availableSubscriptions: Array<any>;
	};
	plus: {
		hasPlus: boolean;
		isTutorialCompleted: boolean;
	};
	defaultEmail: string;
	userhash: string;
}

export interface AutoRenewable {
	expires: Date;
	vendor: "Yandex" | string;
	vendorHelpUrl: string;
	productId: string;
	product: {
		productId: string;
		type: "subscription" | string;
		commonPeriodDuration: string;
		introPeriodDuration: string;
		startPeriodDuration: string;
		duration: number;
		trialDuration: number;
		price: {
			amount: number;
			currency: string;
		};
		introPrice: {
			amount: number;
			currency: string;
		};
		startPrice: {
			amount: number;
			currency: string;
		};
		plus: true;
		feature: string;
		features: Array<string>;
		debug: boolean;
	};
	orderId: number;
	finished: boolean;
}

export interface AccountSettingsUpdate {
	userMusicVisibility: "PUBLIC" | "PRIVATE";
	userSocialVisibility: "PUBLIC" | "PRIVATE";
	theme: "white" | "black" | "default";
}

export interface AccountPromo {
	status: string;
	statusDesc: string;
	accountStatus: StatusBase;
}
