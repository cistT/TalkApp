import { FC } from "react";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Button } from "@material-ui/core";

const QuestionFolder: FC<{
    id: string;
    name: string;
    deleteButton?: boolean;
    deleteFolder: (folderId: string) => void;
    onClick?: () => void;
}> = ({
    name,
    id,
    deleteButton = true,
    deleteFolder,
    onClick = () => undefined,
}) => {
    return (
        <>
            <div style={{ display: "flex", height: "80px" }}>
                <ListItemButton style={{ width: "100vw" }} onClick={onClick}>
                    <ListItemText>{name}</ListItemText>
                </ListItemButton>
                {deleteButton && (
                    <Button onClick={() => deleteFolder(id)}>削除</Button>
                )}
            </div>

            <Divider />
        </>
    );
};

export default QuestionFolder;
