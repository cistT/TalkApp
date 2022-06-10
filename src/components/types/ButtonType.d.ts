import { CSSProperties } from "react";
import { SerializedStyles } from "@emotion/react";
type ButtonType = {
    label?: string;
    style?: CSSProperties;
    emotion?: SerializedStyles;
    variant?: "text" | "outlined" | "contained" | undefined;
    onClick?: () => void;
};

export default ButtonType;
