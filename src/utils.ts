import { URLSearchParams as qs } from "url";

import { List } from "./interfaces";

type ObjType = "artist" | "album" | "playlist" | "track";

/**
 * Getting an object/objects.
 * @param {ObjType} type The type of the object.
 * @param {List} ids The unique identifier of the object or objects.
 * @returns The requested object.
 */
export const list = (type: ObjType, ids: List): [string, URLSearchParams] => {
	const playlist = type === "playlist" ? "/list" : "";
	const q = { [`${type}-ids`]: ids.toString() };
	return [`/${type}s${playlist}`, new qs(q)];
};
