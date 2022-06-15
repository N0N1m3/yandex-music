export interface LandingInterface {
	pumpkin: boolean;
	contentId: string;
	blocks: Array<LandingBlock>;
}

interface LandingBlock {
	id: string;
	type: string;
	typeForFrom: string;
	title: string;
	description: string;
	entities: Array<LandingBlockEntities>;
}

interface LandingBlockEntities {
	id: string;
	type: string;
	data: {
		title: string;
		url: string;
		urlScheme: string;
		textColor: string;
		backgroundColor: string;
		backgroundImageUri: string;
		coverWhite: string;
	};
}
