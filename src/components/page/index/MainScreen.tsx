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

const styles = {
    title: css`
        text-align: center;
        font-family: "Joan", serif;
        animation-name: animation;
        animation-duration: 0.25s;
        animation-timing-function: ease;
        @keyframes animation {
            0% {
                transform: translateY(30px);
            }
            100% {
                transform: translateY(0px);
            }
        }
    `,
    explanation: css`
        text-align: center;
        margin-top: 5px;
        font-family: "Kosugi Maru", sans-serif;
        animation-name: animation;
        animation-duration: 0.25s;
        animation-timing-function: ease;
        @keyframes animation {
            0% {
                transform: translateY(30px);
            }
            100% {
                transform: translateY(0px);
            }
        }
    `,
    mainCard: css`
        width: 100vw;
        max-width: 100vw;
        transition: all 0.5s;
        :hover {
            transform: scale(1.2);
        }
    `,
    cardGroup: css`
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        animation-name: animation;
        animation-duration: 0.5s;
        animation-timing-function: ease;
        @keyframes animation {
            0% {
                transform: translateY(150px);
            }
            100% {
                transform: translateY(0px);
            }
        }
    `,
    subCardGroup: css`
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        animation-name: animation;
        animation-duration: 0.75s;
        animation-timing-function: ease;
        @keyframes animation {
            0% {
                transform: translateY(150px);
            }
            100% {
                transform: translateY(0px);
            }
        }
    `,
    subCard: css`
        transition: all 0.5s;
        :hover {
            transform: scale(1.2);
        }
    `,
};
