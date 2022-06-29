import { FC } from "react";

import { css } from "@emotion/react";

import { ButtonGroup, SvgIconProps } from "@material-ui/core";

import Quadrangle from "./QuadrangleButton";

type Props = {
    label: string;
    onClick: () => void;
    icon?: React.HTMLProps<SvgIconProps> | undefined;
}[];

const CountButtonGroup: FC<{ buttons: Props }> = ({ buttons }) => {
    return (
        <ButtonGroup css={styles.group}>
            {buttons.map((button, i) => (
                <Quadrangle
                    key={`${button.label + i}`}
                    emotion={styles.quadrangle}
                    label={button.label}
                    buttonIcon={button.icon}
                    onClick={button.onClick}
                />
            ))}
        </ButtonGroup>
    );
};

const styles = {
    group: css`
        height: 20vh;
        display: flex;
        justify-content: center;
    `,
    quadrangle: css`
        height: 15vh;
        width: 33vw;
    `,
};

export default CountButtonGroup;
