export interface Genre {
	id: string;
	weight: number;
	composerTop: boolean;
	title: string;
	fullTitle: string;
	titles: GenreTitles;
	showInMenu: boolean;
	color: string;
	images?: {
		[key: string]: string;
	};
	radioIcon?: {
		backgroundColor: string;
		imageUrl: string;
	};
	subGenres?: Array<SubGenre>;
}

interface SubGenre {
	id: string;
	weight: number;
	composerTop: boolean;
	title: string;
	fullTitle: string;
	titles: GenreTitles;
	showInMenu: boolean;
	color: string;
	images?: {
		[key: string]: string;
	};
	radioIcon?: {
		backgroundColor: string;
		imageUrl: string;
	};
}

interface GenreTitles {
	he: {
		title: string;
		fullTitle: string;
	};
	kk: {
		title: string;
		fullTitle: string;
	};
	en: {
		title: string;
		fullTitle: string;
	};
	uk: {
		title: string;
		fullTitle: string;
	};
	hy: {
		title: string;
		fullTitle: string;
	};
	uz: {
		title: string;
		fullTitle: string;
	};
	ro: {
		title: string;
		fullTitle: string;
	};
	ru: {
		title: string;
		fullTitle: string;
	};
	ka: {
		title: string;
		fullTitle: string;
	};
	be: {
		title: string;
		fullTitle: string;
	};
	tr: {
		title: string;
		fullTitle: string;
	};
	az: {
		title: string;
		fullTitle: string;
	};
}
