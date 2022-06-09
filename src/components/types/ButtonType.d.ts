import { CSSProperties } from "react";
import { SerializedStyles } from "@emotion/react";
type ButtonType = {
    label?: string;
    onClick?: () => void;
    variant?: "text" | "outlined" | "contained" | undefined;
    style?: CSSProperties;
    emotion?: SerializedStyles;
};

export default ButtonType;
