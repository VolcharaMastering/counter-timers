import { useCallback, useEffect, useRef } from "react";
import { createSingleTimeout } from "../utils/createSingleTimeout";
import { createSingleInterval } from "../utils/createSingleInterval";

type UseAutoDecrementOpts = {
    awaitMs?: number;
    decrementMs?: number;
    onDecrement: () => void;
};

export const useAutoDecrement = ({
    awaitMs = 10000,
    decrementMs = 1000,
    onDecrement,
}: UseAutoDecrementOpts) => {
    // ref for await of users activity (10s)
    const awaitTimeoutRef = useRef(createSingleTimeout());
    // ref for decrement interval (1s)
    const decrementIntervalRef = useRef(createSingleInterval());
    // is decrement running now
    const decrementRunningRef = useRef(false);

    const registerActivity = useCallback(() => {
        decrementIntervalRef.current.clear();
        decrementRunningRef.current = false;

        awaitTimeoutRef.current.clear();
        awaitTimeoutRef.current.start(() => {
            onDecrement?.();
            if (decrementRunningRef.current) return;
            decrementRunningRef.current = true;

            decrementIntervalRef.current.start(() => {
                onDecrement();
            }, decrementMs);
        }, awaitMs);
    }, [awaitMs, decrementMs, onDecrement]);

    // stop auto-decrement
    const stopAuto = useCallback(() => {
        awaitTimeoutRef.current.clear();
        decrementIntervalRef.current.clear();
        decrementRunningRef.current = false;
    }, []);

    // cleanup
    useEffect(() => {
        const timeout = awaitTimeoutRef.current;
        const interval = decrementIntervalRef.current;

        return () => {
            timeout.clear();
            interval.clear();
        };
    }, []);

    return {
        registerActivity,
        stopAuto,
    } as const;
};
