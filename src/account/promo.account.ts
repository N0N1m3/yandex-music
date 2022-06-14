export interface AccountPromo {
	status: string;
	statusDesc: string;
	accountStatus: {
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
	};
}
