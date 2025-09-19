/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import CustomButton from "./components/CustomButton/CustomButton";
import Counter from "./components/Counter/Counter";
import { useAutoDecrement } from "./hooks/useAutoDecrement";
import "./App.scss";

const App = () => {
    const buttonQuantity = 3;
    const buttonValues = Array.from({ length: buttonQuantity }, (_, i) => i + 1);

    const [counter, setCounter] = useState(0);

    const onDecrement = useCallback(() => {
        setCounter((prev: number) => {
            if (prev <= 0) {
                stopAuto();
                return 0;
            }
            return prev - 1;
        });
    }, []);

    const { registerActivity, stopAuto } = useAutoDecrement({
        awaitMs: 10000,
        decrementMs: 1000,
        onDecrement,
    });

    const changeCounter = useCallback(
        (value: number) => {
            registerActivity();
            setCounter((prev: number) => prev + value);
        },
        [registerActivity]
    );
    return (
        <main className="app">
            <h1 className="main-title">Counters & Timers</h1>

            <Counter counterValue={counter} />

            <section className="buttons-section">
                {buttonValues.map((n) => (
                    <CustomButton key={n} value={n} setCounter={changeCounter} />
                ))}
            </section>
        </main>
    );
};

export default App;
