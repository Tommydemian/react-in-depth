import type { ManageStack } from "./types";
const effects: (() => void)[] = [];

let activeIndex = 0;

export function useEffect(callback: () => void) {
	effects[activeIndex] = callback;
	++activeIndex;
}

export function manipulateEffects(
	operation: ManageStack,
	callbacks?: (() => void)[],
) {
	if (operation === "populate" && callbacks) {
		for (const cb of callbacks) {
			effects.push(cb);
		}
	} else {
		if (effects.length === 0) return;
		effects.pop();
		return manipulateEffects("empty");
	}
}
