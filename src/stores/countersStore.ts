// store/counterStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createSingleTimeout } from "../utils/createSingleTimeout";
import { createSingleInterval } from "../utils/createSingleInterval";

const decrementTimeout = createSingleTimeout(); // 10s idle detector
const decrementInterval = createSingleInterval(); // 1s decrement loop
const pauseTimeouts: Record<number, ReturnType<typeof createSingleTimeout>> = {};

let decrementIntervalRunning = false;

export const useCounterStore = create<CounterState>()(
    devtools(
        (set, get) => ({
            counterValue: 0,
            isActiveRecently: false,
            isPaused: {},
            registerActivity: () => {
                set({ isActiveRecently: true }, false, { type: "registerActivity" });

                decrementInterval.clear();
                decrementIntervalRunning = false;

                // restart timer for 10s of inactivity
                decrementTimeout.start(() => {
                    set({ isActiveRecently: false }, false, { type: "decrementTimeout" });

                    if (!decrementIntervalRunning) {
                        decrementIntervalRunning = true;

                        decrementInterval.start(() => {
                            const { counterValue, isActiveRecently, isPaused } = get();

                            // If button pressed, restart decrement
                            if (isActiveRecently || Object.values(isPaused).some((v) => v)) {
                                return;
                            }

                            if (counterValue <= 0) {
                                decrementInterval.clear();
                                decrementIntervalRunning = false;
                                return;
                            }

                            set(
                                { counterValue: Math.max(0, counterValue - 1) },
                                // Credits to devtools history
                                false,
                                {
                                    type: "decrement",
                                    value: 1,
                                }
                            );
                        }, 1000);
                    }
                }, 10_000);
            },

            // button pressed, increment counter and pause button
            increment: (value: number) => {
                const { isPaused } = get();
                if (isPaused[value]) return; // ignore if already paused

                get().registerActivity();

                set(
                    (state) => ({
                        counterValue: state.counterValue + value,
                        isPaused: { ...state.isPaused, [value]: true },
                    }),
                    // Credits to devtools history
                    false,
                    {
                        type: "increment",
                        value,
                    }
                );

                // individual timeout manager for each button
                if (!pauseTimeouts[value]) {
                    pauseTimeouts[value] = createSingleTimeout();
                }

                // pause button: value * 500 мс
                pauseTimeouts[value].start(() => {
                    set(
                        (state) => ({
                            isPaused: { ...state.isPaused, [value]: false },
                        }),
                        false,
                        { type: "unpause", value }
                    );
                }, value * 500);
            },

            // reset all state
            reset: () => {
                decrementTimeout.clear();
                decrementInterval.clear();
                decrementIntervalRunning = false;

                Object.values(pauseTimeouts).forEach((t) => t.clear());

                set({ counterValue: 0, isActiveRecently: false, isPaused: {} }, false, {
                    type: "reset",
                });
            },
        }),
        { name: "countersStore" }
    )
);
