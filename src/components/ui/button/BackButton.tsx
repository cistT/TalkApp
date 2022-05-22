import { Button } from "@material-ui/core";
import { FC } from "react";

const BackButton: FC<{
    onClick: () => void;
}> = ({ onClick }) => {
    return (
        <Button
            onClick={onClick}
            variant="outlined"
            style={{
                float: "right",
                width: "50vw",
                height: "60px",
            }}
        >
            戻る
        </Button>
    );
};

export default BackButton;
