import { URLSearchParams as qs } from "url";

type ObjType = "artist" | "album" | "playlist" | "track";

/**
 * Getting an object/objects.
 * @param {ObjType} type The type of the object.
 * @param {number | Array<number>} ids The unique identifier of the object or objects.
 * @returns The requested object.
 */
export const list = (type: ObjType, ids: number | Array<number>): [string, URLSearchParams] => {
	const playlist = type === "playlist" ? "/list" : "";
	const q = {
		[`${type}-ids`]: ids.toString(),
	};
	return [`/${type}s${playlist}`, new qs(q)];
};
