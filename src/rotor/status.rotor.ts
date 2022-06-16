export interface RotorStatusInterface {
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
	subscription: {};
	skipsPerHour: number;
	stationExists: boolean;
	plus: {
		hasPlus: boolean;
		isTutorialCompleted: boolean;
		migrated: boolean;
	};
}
