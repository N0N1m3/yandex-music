export interface AccountStatus {
	account: {
		now: string;
		uid: number;
		login: string;
		region: number;
		fullName: string;
		secondName: string;
		firstName: string;
		displayName: string;
		serviceAvailable: boolean;
		hostedUser: boolean;
		"passport-phones"?: Array<{ phone: string }>;
		registeredAt?: string;
	};
	permissions: {
		until: string;
		values: Array<string>;
		default: Array<string>;
	};
	subscription: {
		autoRenewable?: Array<AutoRenewable>;
		nonAutoRenewableRemainder?: {
			days: number;
		};
		hadAnySubscription: boolean;
		canStartTrial: boolean;
		mcdonalds: boolean;
	};
	subeditor: boolean;
	subeditorLevel: number;
	pretrialActive: boolean;
	advertisement: string,
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

interface AutoRenewable {
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
