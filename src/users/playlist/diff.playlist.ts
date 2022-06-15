enum Operations {
	INSERT = "insert",
	DELETE = "delete",
}

interface Track {
	id: string;
	albumId: string;
}

interface Insert {
	op: Operations;
	at: number;
	tracks: Array<Track>;
}

interface Delete {
	op: Operations;
	from: number;
	to: number;
}

export class Difference {
  /**
   * Adding an insertion operation.
   * @param {null} at Index to insert.
   * @param {Array<Track>} tracks An object with unique track IDs and .
   * @returns JSON stringify operation
   */
	public static insert(at: number, tracks: Array<Track>): string {
		const operation: Insert = { op: Operations.INSERT, at: at, tracks: [] };

		for (let { id, albumId } of tracks) operation["tracks"].push({ id, albumId });

		return JSON.stringify(operation);
	}

  /**
   * The range for deleting tracks is passed.
   * @param {null} from From which index.
   * @param {null} to By what index.
   * @returns JSON stringify operation
   */
	public static delete(from: number, to: number): string {
		const operation: Delete = { op: Operations.DELETE, from: from, to: to };

		return JSON.stringify(operation);
	}
}
