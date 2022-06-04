import { CSSProperties } from "react";

type ButtonType = {
    label?: string;
    onClick?: () => void;
    variant?: "text" | "outlined" | "contained" | undefined;
    style?: CSSProperties;
};

export default ButtonType;
