export type GenreLanguage = { title: string; fullTitle: string };

export interface GenreTitles {
	he: GenreLanguage;
	kk: GenreLanguage;
	en: GenreLanguage;
	uk: GenreLanguage;
	hy: GenreLanguage;
	uz: GenreLanguage;
	ro: GenreLanguage;
	ru: GenreLanguage;
	ka: GenreLanguage;
	be: GenreLanguage;
	tr: GenreLanguage;
	az: GenreLanguage;
}

export interface GenreBase {
	id: string;
	weight: number;
	composerTop: boolean;
	title: string;
	fullTitle: string;
	titles: GenreTitles;
	showInMenu: boolean;
	color: string;
	images?: { [key: string]: string };
	radioIcon?: { backgroundColor: string; imageUrl: string };
}

export interface Genre extends GenreBase {
	subGenres?: Array<GenreBase>;
}
