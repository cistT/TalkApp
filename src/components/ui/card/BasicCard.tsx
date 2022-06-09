import { FC } from "react";

import { css } from "@emotion/css";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import BasicCardType from "../../types/BasicCardType";

const BasicCard: FC<BasicCardType> = ({
    title = "",
    explanation = "",
    buttonLabel = "見る",
    onClick = () => undefined,
}) => {
    return (
        <Card className={styles.card}>
            <CardContent className={styles.cardContent}>
                <Typography
                    className={styles.cardTitle}
                    variant="h4"
                    component="div"
                >
                    {title}
                </Typography>
                <Typography variant="body2">{explanation}</Typography>
            </CardContent>
            <CardActions>
                <Button
                    className={styles.cardButton}
                    variant="outlined"
                    onClick={onClick}
                >
                    {buttonLabel}
                </Button>
            </CardActions>
        </Card>
    );
};

export default BasicCard;

const styles = {
    card: css`
        min-width: 20vw;
        max-width: 60vw;
        max-height: 50vh;
        margin: 20px;
    `,
    cardContent: css`
        text-align: center;
    `,
    cardTitle: css`
        font-family: "Kosugi Maru", sans-serif;
    `,
    cardButton: css`
        height: 60px;
        width: 100%;
    `,
};
