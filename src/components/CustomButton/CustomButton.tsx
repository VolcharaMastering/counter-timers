import { useCounterStore } from "../../stores/countersStore";
import "./CustomButton.scss";

type PropsButton = {
    value: number;
};
const CustomButton: React.FC<PropsButton> = ({ value }) => {
    const increment = useCounterStore((s) => s.increment);
    const isPaused = useCounterStore((s) => s.isPaused[value]);
    return (
        <button
            className={`button ${isPaused ? "disabled" : ""}`}
            type="button"
            onClick={() => {
                increment(value);
            }}
            disabled={isPaused}
        >
            {value}
        </button>
    );
};
export default CustomButton;
