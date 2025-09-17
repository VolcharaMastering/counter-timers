interface CounterState {
    counterValue: number;
    isActiveRecently: boolean;
    isPaused: Record<number, boolean>;

    registerActivity: () => void;
    increment: (value: number) => void;
    reset: () => void;
}
