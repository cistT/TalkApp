import { FC } from "react";
import { css } from "@emotion/react";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Button } from "@material-ui/core";

type Props = {
    id: string;
    name: string;
    deleteButton?: boolean;
    deleteFolder: (folderId: string) => void;
    onClick?: () => void;
};

const QuestionFolder: FC<Props> = ({
    name,
    id,
    deleteButton = true,
    deleteFolder,
    onClick = () => undefined,
}) => {
    return (
        <>
            <div css={styles.group}>
                <ListItemButton css={styles.item} onClick={onClick}>
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

const styles = {
    group: css`
        display: flex;
        height: 80px;
    `,
    item: css`
        width: 100vw;
    `,
};

export default QuestionFolder;
