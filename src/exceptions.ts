export class YandexMusicError extends Error {
	constructor(message: string) {
		super(message);
	}

	get name() {
		return this.constructor.name;
	}
}

export class BadRequestError extends YandexMusicError {}

export class UnauthorizedError extends YandexMusicError {}

export class NotFoundError extends YandexMusicError {}

export class NetworkError extends YandexMusicError {}
