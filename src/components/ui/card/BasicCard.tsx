import { FC } from "react";

import { css, SerializedStyles } from "@emotion/react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type Props = {
    title?: string;
    explanation?: string;
    buttonLabel?: string;
    emotion?: SerializedStyles;
    onClick?: () => void;
};

const BasicCard: FC<Props> = ({
    title = "",
    explanation = "",
    buttonLabel = "見る",
    emotion,
    onClick = () => undefined,
}) => {
    return (
        <Card css={[emotion, styles.card]}>
            <CardContent css={styles.cardContent}>
                <Typography css={styles.cardTitle} variant="h4" component="div">
                    {title}
                </Typography>
                <Typography variant="body2">{explanation}</Typography>
            </CardContent>
            <CardActions>
                <Button
                    css={styles.cardButton}
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
        min-width: 40vw;
        max-width: 80vw;
        max-height: 50vh;
        margin: 20px 10px;
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
