import { useCounterStore } from "../../stores/countersStore";
import "./CustomButton.scss";

type PropsButton = {
    value: number;
};
const CustomButton: React.FC<PropsButton> = ({ value }) => {
    const increment = useCounterStore((s) => s.increment);
    const registerActivity = useCounterStore((s) => s.registerActivity);
    const isPaused = useCounterStore((s) => s.isPaused[value]);
    console.log("Button render", value);
    const handleClick = () => {
        console.log("Pressed", value);
        registerActivity();
        increment(value);
    };
    return (
        <button
            className={`button ${isPaused ? "disabled" : ""}`}
            type="button"
            onClick={handleClick}
            disabled={isPaused}
        >
            {value}
        </button>
    );
};
export default CustomButton;
