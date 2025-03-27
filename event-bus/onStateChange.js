// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const listeners = {};
export function subscribe(eventName, callback) {
    if (!listeners[eventName]) {
        listeners[eventName] = [];
    }
    listeners[eventName].push(callback);
}
export function emit(eventName, payload) {
    const eventListeners = listeners[eventName];
    if (eventListeners) {
        for (const callback of eventListeners) {
            callback(payload);
        }
    }
}
