type Callback<T> = (payload: T) => void;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const listeners: { [eventName: string]: Callback<any>[] } = {};

export function subscribe<T>(eventName: string, callback: Callback<T>) {
	if (!listeners[eventName]) {
		listeners[eventName] = [];
	}
	listeners[eventName].push(callback);
}

export function emit<T>(eventName: string, payload: T) {
	const eventListeners = listeners[eventName];
	if (eventListeners) {
		for (const callback of eventListeners) {
			callback(payload);
		}
	}
}
