import { YandexMusicError } from "../exceptions";

/* eslint-disable */

type Decorator = (
	target: any,
	propertyKey: string,
	descriptor: PropertyDescriptor
) => PropertyDescriptor;



export const Catch = (type: any): Decorator => {
	return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		// Save a reference to the original method
		const originalMethod: any = descriptor.value;

		// Rewrite original method with try/catch wrapper
		descriptor.value = function (...args: any[]) {
			try {
				const result: any = originalMethod.apply(this, args);

				// Check if method is asynchronous
				if (result && result instanceof Promise) {
					// Return promise
					return result.catch((error: YandexMusicError) => {
						console.debug(`Entering: ${propertyKey}`);
						handleError(propertyKey, type, error);
					});
				}

				// Return actual result
				return result;
			} catch (error: any) {
				console.debug(`Entering: ${propertyKey}`);
				handleError(propertyKey, type, error as YandexMusicError);
			}
		};

		return descriptor;
	};
};

export const log = (): any => Catch(YandexMusicError);

function handleError(ctx: string, errorType: any, error: YandexMusicError) {
	// Check if error is instance of given error type
	if (error instanceof errorType) {
		// Run handler with error object and class context
		console.log(`${error.name}: ${error.message}`);
		console.log(`Exiting: ${ctx}`);
	} else {
		// Throw error further
		// Next decorator in chain can catch it
		console.log(error);
		console.log(`Exiting: ${ctx}`);
	}
}
