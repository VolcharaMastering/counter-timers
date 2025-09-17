import { useState } from "react";
import "./App.scss";

function App() {
    const buttonQuantity = 3;

    return (
        <main className="app">
            <h1 className="main-title">Counters & Timers</h1>
            {/* <Counter /> */}
            <section className="buttons-section">
                {Array.from({ length: buttonQuantity }, (_, i) => (
                    // <Button key={i + 1} value={i + 1} />
                    <button key={i + 1} value={i + 1}>{i + 1}</button>
                ))}
            </section>
        </main>
    );
}

export default App;
