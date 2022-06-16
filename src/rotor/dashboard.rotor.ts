export interface RotorDashboardInterface {
	dashboardId: string;
	stations: Array<RotorStation>;
	pumpkin: boolean;
}

interface RotorDiversity {
	type: string;
	name: string;
	possibleValues: Array<{
		value: "default" | "diverse" | "favorite" | "popular";
		name: "Все" | "Редкие" | "Любимые" | "Популярные";
	}>;
}

interface RotorDiversityPosibleValues {
	value: "favorite" | "discover" | "popular" | "default";
	name: "Любимое" | "Незнакомое" | "Популярное" | "Любое";
	imageUrl?: string;
	serializedSeed:
		| "settingDiversity:favorite"
		| "settingDiversity:discover"
		| "settingDiversity:popular"
		| "settingDiversity:default";
}

interface RotorEnergyPosibleValues {
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

interface RotorLanguagePosibleValues {
	value: "russian" | "not-russian" | "any";
	name: "Русский" | "Иностранный" | "Любой";
	serializedSeed:
		| "settingLanguage:russian"
		| "settingLanguage:not-russian"
		| "settingLanguage:any";
}

export interface RotorStation {
	station: {
		id: {
			type: string;
			tag: string;
		};
		name: string;
		icon: {
			backgroundColor: string;
			imageUrl: string;
		};
		mtsIcon: {
			backgroundColor: string;
			imageUrl: string;
		};
		fullImageUrl: string;
		idForFrom: string;
		restrictions: {
			language: {
				type: string;
				name: string;
				possibleValues: Array<{
					value: "russian" | "not-russian" | "any";
					name: "Русский" | "Иностранный" | "Любой";
				}>;
			};
			mood: {
				type: string;
				name: string;
				min: {
					value: number;
					name: string;
				};
				max: {
					value: number;
					name: string;
				};
			};
			energy: {
				type: string;
				name: string;
				min: {
					value: number;
					name: string;
				};
				max: {
					value: number;
					name: string;
				};
			};
			diversity: RotorDiversity;
		};

		restrictions2: {
			diversity: {
				type: string;
				name: string;
				possibleValues: Array<RotorDiversityPosibleValues>;
			};
			moodEnergy: {
				type: string;
				name: string;
				possibleValues: Array<RotorEnergyPosibleValues>;
			};
			language: {
				type: string;
				name: string;
				possibleValues: Array<RotorLanguagePosibleValues>;
			};
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
