import { memo, useState } from "react";
import "./CustomButton.scss";

type PropsButton = {
    value: number;
    setCounter: (value: number) => void;
};

const CustomButton: React.FC<PropsButton> = ({ value, setCounter }) => {
    const [disabled, setDisabled] = useState(false);

    const handleClick = () => {
        if (disabled) return;
        setCounter(value);
        setDisabled(true);
        setTimeout(() => setDisabled(false), value * 500);
    };
    return (
        <button
            className={`button ${disabled ? "disabled" : ""}`}
            type="button"
            onClick={handleClick}
            disabled={disabled}
        >
            {value}
        </button>
    );
};

export default memo(CustomButton);
