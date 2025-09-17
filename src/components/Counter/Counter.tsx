import { useCounterStore } from "../../stores/countersStore";
import "./Counter.scss";

const Counter: React.FC = () => {
    const counterValue = useCounterStore((s) => s.counterValue);
    console.log("Counter render", counterValue);
    return (
        <section className="counter">
            <p className="counter__value">{counterValue}</p>
        </section>
    );
};
export default Counter;
