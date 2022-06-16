import { Artist } from "../artist";
import { RotorStation } from "./dashboard.rotor";

export interface RotorListInterface extends RotorStation {
	data: {
		title: string;
		description: string;
		imageUri: string;
		artists: Array<Artist>;
	};
}
