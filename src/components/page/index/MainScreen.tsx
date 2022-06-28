import { FC } from "react";

import { css, keyframes } from "@emotion/react";

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
                    style={styles.mainCard}
                    onClick={mainCard.onClick}
                />
            </div>

            <div css={styles.subCardGroup}>
                {subCards.map((card, i) => (
                    <BasicCard
                        key={`${card.title + i}`}
                        title={card.title}
                        explanation={card.explanation ?? ""}
                        buttonLabel={card.buttonLabel}
                        style={styles.subCard}
                        onClick={card.onClick}
                    />
                ))}
            </div>
        </>
    );
};

export default MainScreen;

const keyframe = {
    animation: keyframes`
        0% {
            transform: translateY(150px);
            opacity:0;
        }
        100% {
            transform: translateY(0px);
            opacity:1;
        }
    `,
};

const styles = {
    title: css`
        text-align: center;
        font-family: "Joan", serif;
        animation-name: ${keyframe.animation};
        animation-duration: 0.5s;
        animation-timing-function: ease;
    `,
    explanation: css`
        text-align: center;
        margin-top: 5px;
        font-family: "Kosugi Maru", sans-serif;
        animation-name: ${keyframe.animation};
        animation-duration: 0.5s;
        animation-timing-function: ease;
    `,
    mainCard: css`
        width: 100vw;
        max-width: 100vw;
        cursor: pointer;
        transition: all 0.5s;
        :hover {
            background-color: rgba(35, 133, 252, 0.05);
            transform: scale(1.1);
        }
    `,
    cardGroup: css`
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        animation-name: ${keyframe.animation};
        animation-duration: 0.75s;
        animation-timing-function: ease;
    `,
    subCardGroup: css`
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        animation-name: ${keyframe.animation};
        animation-duration: 1s;
        animation-timing-function: ease;
    `,
    subCard: css`
        transition: all 0.5s;
        cursor: pointer;
        :hover {
            background-color: rgba(35, 133, 252, 0.05);
            transform: scale(1.1);
        }
    `,
};
