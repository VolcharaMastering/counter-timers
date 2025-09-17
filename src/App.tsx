import "./App.scss";
import CustomButton from "./components/CustomButton/CustomButton";
import Counter from "./components/Counter/Counter";

function App() {
    const buttonQuantity = 3;

    return (
        <main className="app">
            <h1 className="main-title">Counters & Timers</h1>
            <Counter />
            <section className="buttons-section">
                {Array.from({ length: buttonQuantity }, (_, i) => (
                    <CustomButton key={i + 1} value={i + 1} />
                ))}
            </section>
        </main>
    );
}

export default App;
