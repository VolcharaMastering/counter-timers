// store/counterStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createSingleTimeout } from "../utils/createSingleTimeout";
import { createSingleInterval } from "../utils/createSingleInterval";

const idleTimeout = createSingleTimeout(); // 10s idle detector
const pauseTimeouts: Record<number, ReturnType<typeof createSingleTimeout>> = {};
const decrementInterval = createSingleInterval(); // 1s decrement loop

export const useCounterStore = create<CounterState>()(
    devtools(
        (set, get) => ({
            counterValue: 0,
            isActiveRecently: false,
            isPaused: {},

            // mark that user did an action; restart the 10s idle watcher
            registerActivity: () => {
                // set activity flag and stop any auto-decrement in progress
                set({ isActiveRecently: true });
                decrementInterval.clear();

                // start 10s timer; when it comes to 0, we mark inactive and start auto-decrement
                idleTimeout.start(() => {
                    set({ isActiveRecently: false });

                    // start decrement interval; inside callback we check flags and value
                    decrementInterval.start(() => {
                        const { counterValue, isActiveRecently, isPaused, reset } = get();

                        // if activity resumed stop decrementing
                        if (isActiveRecently || Object.values(isPaused).some((v) => v)) {
                            decrementInterval.clear();
                            return;
                        }

                        // if reached 0 then stop interval
                        if (counterValue <= 0) {
                            reset();
                            return;
                        }
                        console.log("Auto-decrementing", counterValue);
                        // decrement by 1
                        set({ counterValue: Math.max(0, counterValue - 1) });
                    }, 1000);
                }, 10_000); // 10 seconds
            },

            // increment — blocked while isPaused (adjust if you still want increments during pause)
            increment: (value: number) => {
                const { isPaused } = get();
                if (isPaused[value]) return; // ignore increment while temporary paused

                set((state) => ({
                    counterValue: state.counterValue + value,
                    isPaused: { ...state.isPaused, [value]: true },
                }));
                if (!pauseTimeouts[value]) {
                    pauseTimeouts[value] = createSingleTimeout();
                }

                pauseTimeouts[value].start(() => {
                    set((state) => ({
                        isPaused: { ...state.isPaused, [value]: false },
                    }));
                }, value * 500); // pause for half the button value in seconds
                console.log("Paused", value);
                get().registerActivity();
            },

            // reset everything (useful for tests)
            reset: () => {
                idleTimeout.clear();
                decrementInterval.clear();
                set({ counterValue: 0, isActiveRecently: false, isPaused: {} });
            },
        }),
        { name: "countersStore" }
    )
);
