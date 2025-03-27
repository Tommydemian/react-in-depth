const globalStateAllocation = [];
import { emit } from "./event-bus/onStateChange.js";
let stateIndex = 0;
export function useState(initialValue) {
	if (globalStateAllocation[stateIndex] == null) {
		globalStateAllocation[stateIndex] = initialValue;
	}
	const currenIndex = stateIndex;
	stateIndex++;
	const val = globalStateAllocation[currenIndex];
	const setter = (param) => {
		if (typeof param === "function") {
			globalStateAllocation[currenIndex] = param(val);
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
