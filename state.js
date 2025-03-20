const globalStateAllocation = []; // storage
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
        }
        else {
            globalStateAllocation[currenIndex] = param;
        }
    };
    return [val, setter];
}
// feat: reset global state
export function resetGlobalState() {
    stateIndex = 0;
}
