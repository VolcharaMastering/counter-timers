interface CounterState {
    counterValue: number;
    isActiveRecently: boolean; // Button pressed and value true for 10s
    isPaused: Record<number, boolean>;
    registerActivity: () => void;
    pauseFor: (ms: number) => void;
    increment: (by: number) => void;
    reset: () => void;
}
