interface InvocationInfo {
	hostname: string;
	"req-id": string;
	"exec-duration-mills": string;
}

export interface YandexMusicResponse<T> {
	invocationInfo: InvocationInfo;
	result: T;
}
