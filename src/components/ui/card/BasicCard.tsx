import { FC } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const BasicCard: FC<{
    title?: string;
    explanation?: string;
    buttonLabel?: string;
    onClick?: () => void;
}> = ({
    title = "",
    explanation = "",
    buttonLabel = "見る",
    onClick = () => undefined,
}) => {
    return (
        <Card
            sx={{
                minWidth: "20vw",
                maxWidth: "60vw",
                maxHeight: "50vh",
                margin: "20px",
            }}
        >
            <CardContent style={{ textAlign: "center" }}>
                <Typography variant="h4" component="div">
                    {title}
                </Typography>
                <Typography variant="body2">{explanation}</Typography>
            </CardContent>
            <CardActions>
                <Button
                    onClick={onClick}
                    variant="outlined"
                    style={{ height: "60px", width: "100%" }}
                >
                    {buttonLabel}
                </Button>
            </CardActions>
        </Card>
    );
};

export default BasicCard;
