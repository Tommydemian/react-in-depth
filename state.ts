const globalStateAllocation: unknown[] = [];
import { emit } from "./event-bus/onStateChange";

let stateIndex = 0;

export function useState<T>(initialValue: T): [T, (newValue: T) => void] {
	if (globalStateAllocation[stateIndex] == null) {
		globalStateAllocation[stateIndex] = initialValue;
	}
	const currenIndex = stateIndex;
	stateIndex++;
	const val = globalStateAllocation[currenIndex] as T;

	const setter = (param: T | ((prev: T) => T)) => {
		if (typeof param === "function") {
			globalStateAllocation[currenIndex] = (param as (prev: T) => T)(val);
		} else {
			globalStateAllocation[currenIndex] = param;
		}
		resetGlobalState();
		emit("setter-fired", true);
	};

	return [val, setter];
}

export function resetGlobalState() {
	stateIndex = 0;
}
