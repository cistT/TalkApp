import { CSSProperties, FC } from "react";

import { ButtonGroup, styled } from "@material-ui/core";

import Quadrangle from "./QuadrangleButton";

const CountDownButtonGroup = styled(ButtonGroup)({
    height: "20vh",
    display: "flex",
    justifyContent: "center",
});
const QuadrangleStyle: CSSProperties = {
    height: "15vh",
    width: "33vw",
};

type Props = {
    label: string;
    onClick: () => void;
}[];

const CountButtonGroup: FC<{ buttons: Props }> = ({ buttons }) => {
    return (
        <CountDownButtonGroup>
            {buttons.map((button, i) => (
                <Quadrangle
                    label={button.label}
                    onClick={button.onClick}
                    style={QuadrangleStyle}
                    key={`${button.label + i}`}
                />
            ))}
        </CountDownButtonGroup>
    );
};

export default CountButtonGroup;
