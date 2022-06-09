import React, { FC } from "react";

import { css } from "@emotion/css";

import { Typography } from "@material-ui/core";

import BasicCard from "../../ui/card/BasicCard";

type Props = {
    title: string;
    explanation?: string;
    buttonLabel: string;
    onClick: () => void;
}[];

const MainScreen: FC<{ cards: Props }> = ({ cards }) => {
    return (
        <>
            <Typography className={styles.title} variant="h2">
                Talk-App
            </Typography>
            <Typography className={styles.explanation} variant="h5">
                グループワークで使えるアプリ
            </Typography>

            <div className={styles.cardGroup}>
                {cards.map((card, i) => (
                    <BasicCard
                        key={`${card.title + i}`}
                        title={card.title}
                        explanation={card.explanation ?? ""}
                        buttonLabel={card.buttonLabel}
                        onClick={card.onClick}
                    />
                ))}
            </div>
        </>
    );
};

export default MainScreen;

const styles = {
    title: css`
        text-align: center;
        font-family: "Joan", serif;
    `,
    explanation: css`
        text-align: center;
        margin-top: 5px;
        font-family: "Kosugi Maru", sans-serif;
    `,
    cardGroup: css`
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    `,
};
