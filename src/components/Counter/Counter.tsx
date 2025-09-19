import { memo } from "react";
import "./Counter.scss";

type PropsCounter = {
    counterValue: number;
};

const Counter: React.FC<PropsCounter> = ({ counterValue }) => {
    return (
        <section className="counter">
            <p className="counter__value">{counterValue}</p>
        </section>
    );
};

export default memo(Counter);
