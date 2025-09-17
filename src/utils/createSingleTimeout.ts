// universal factory for a single reusable timeout.
export const createSingleTimeout = () => {
    let timerId: ReturnType<typeof setTimeout> | null = null;

    const start = (callback: () => void, delay: number) => {
        if (timerId) {
            clearTimeout(timerId);
            timerId = null;
        }
        timerId = setTimeout(() => {
            timerId = null;
            callback();
        }, delay);
    };

    const clear = () => {
        if (timerId) {
            clearTimeout(timerId);
            timerId = null;
        }
    };

    return { start, clear };
};
