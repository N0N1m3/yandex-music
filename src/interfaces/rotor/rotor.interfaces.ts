import { ArtistInterface as Artist } from "../artists/artists.interfaces";

import { TrackInterface as Track } from "../tracks/tracks.interfaces";

export interface RotorSequence {
	type: string;
	track: Track;
	liked: boolean;
	trackParameters: {
		bpm: number;
		hue: number;
		energy: number;
	};
}

export interface RotorTracks {
	id: { type: string; tag: string };
	sequence: Array<RotorSequence>;
	batchId: string;
	pumpkin: boolean;
}

export interface RotorList extends RotorStation {
	data: {
		title: string;
		description: string;
		imageUri: string;
		artists: Array<Artist>;
	};
}

export interface RotorDashboard {
	dashboardId: string;
	stations: Array<RotorStation>;
	pumpkin: boolean;
}

export interface DiversityValues {
	value: "default" | "diverse" | "favorite" | "popular";
	name: "Все" | "Редкие" | "Любимые" | "Популярные";
}

export interface RotorDiversity {
	type: string;
	name: string;
	possibleValues: Array<DiversityValues>;
}

export interface DiversityPosibleValues {
	value: "favorite" | "discover" | "popular" | "default";
	name: "Любимое" | "Незнакомое" | "Популярное" | "Любое";
	imageUrl?: string;
	serializedSeed:
		| "settingDiversity:favorite"
		| "settingDiversity:discover"
		| "settingDiversity:popular"
		| "settingDiversity:default";
}

export interface EnergyPosibleValues {
	value: "active" | "fun" | "calm" | "sad" | "all";
	name: "Бодрое" | "Весёлое" | "Спокойное" | "Грустное" | "Любое";
	imageUrl?: string;
	serializedSeed:
		| "settingMoodEnergy:active"
		| "settingMoodEnergy:fun"
		| "settingMoodEnergy:calm"
		| "settingMoodEnergy:sad"
		| "settingMoodEnergy:all";
}

export interface LanguagePosibleValues {
	value: "russian" | "not-russian" | "any";
	name: "Русский" | "Иностранный" | "Любой";
	serializedSeed:
		| "settingLanguage:russian"
		| "settingLanguage:not-russian"
		| "settingLanguage:any";
}

export interface StationLanguage {
	type: string;
	name: string;
	possibleValues: Array<{
		value: "russian" | "not-russian" | "any";
		name: "Русский" | "Иностранный" | "Любой";
	}>;
}

export interface StationIcon {
	backgroundColor: string;
	imageUrl: string;
}

export interface Restrictions2Values<T> {
	type: string;
	name: string;
	possibleValues: Array<T>;
}

export interface StationLad {
	type: string;
	name: string;
	min: { value: number; name: string };
	max: { value: number; name: string };
}

export interface RotorStation {
	station: {
		id: { type: string; tag: string };
		name: string;
		icon: StationIcon;
		mtsIcon: StationIcon;
		fullImageUrl: string;
		idForFrom: string;
		restrictions: {
			language: StationLanguage;
			mood: StationLad;
			energy: StationLad;
			diversity: RotorDiversity;
		};
		restrictions2: {
			diversity: Restrictions2Values<DiversityPosibleValues>;
			moodEnergy: Restrictions2Values<EnergyPosibleValues>;
			language: Restrictions2Values<LanguagePosibleValues>;
		};
	};
	settings: {
		language: string;
		mood: number;
		energy: number;
		diversity: string;
	};
	settings2: {
		language: string;
		moodEnergy: string;
		diversity: string;
	};
	adParams: {
		partnerId: string;
		categoryId: string;
		pageRef: string;
		targetRef: string;
		otherParams: string;
		adVolume: number;
	};
	explanation: string;
	rupTitle: string;
	rupDescription: string;
}

export interface RotorStatus {
	account: {
		now: string;
		uid: number;
		login: string;
		fullName: string;
		secondName: string;
		firstName: string;
		displayName: string;
		hostedUser: boolean;
		serviceAvailable: boolean;
	};
	permissions: {
		until: string;
		values: Array<string>;
		default: Array<string>;
	};
	subscription: Record<string, any>;
	skipsPerHour: number;
	stationExists: boolean;
	plus: {
		hasPlus: boolean;
		isTutorialCompleted: boolean;
		migrated: boolean;
	};
}
