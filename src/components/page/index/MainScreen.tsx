import { FC } from "react";

import { css } from "@emotion/react";

import { Typography } from "@material-ui/core";

import BasicCard from "../../ui/card/BasicCard";

type Card = {
    title: string;
    explanation?: string;
    buttonLabel: string;
    onClick: () => void;
};

type Props = {
    cards: Card[];
};

const MainScreen: FC<Props> = ({ cards }) => {
    const mainCard = cards[0];
    const subCards = cards.slice(1);
    return (
        <>
            <Typography css={styles.title} variant="h2">
                Talk-App
            </Typography>
            <Typography css={styles.explanation} variant="h5">
                グループワークで使えるアプリ
            </Typography>

            <div css={styles.cardGroup}>
                <BasicCard
                    title={mainCard.title}
                    explanation={mainCard.explanation ?? ""}
                    buttonLabel={mainCard.buttonLabel}
                    emotion={styles.mainCard}
                    onClick={mainCard.onClick}
                />
            </div>

            <div css={styles.cardGroup}>
                {subCards.map((card, i) => (
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
    mainCard: css`
        width: 100vw;
        max-width: 100vw;
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
