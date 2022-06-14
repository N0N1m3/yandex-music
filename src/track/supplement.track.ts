export interface TrackSupplement {
	id: string;
	lyrics?: {
		id: number;
		lyrics: string;
		fullLyrics: string;
		hasRights: boolean;
		textLanguage: string;
		showTranslation: boolean;
	};
}
