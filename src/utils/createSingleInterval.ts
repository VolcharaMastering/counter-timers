// universal factory for repeating of action at regular intervals
export const createSingleInterval = () => {
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const start = (callback: () => void, delay: number) => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        intervalId = setInterval(callback, delay);
    };

    const clear = () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    };

    return { start, clear };
};
