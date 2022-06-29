import { FC } from "react";
import { css } from "@emotion/react";

import ListItemButton from "@mui/material/ListItemButton";
import { Button } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";

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
                    <div css={styles.label}>{name}</div>
                </ListItemButton>
                {deleteButton && (
                    <Button
                        css={styles.button}
                        onClick={() => deleteFolder(id)}
                    >
                        <>
                            <DeleteIcon />
                            <div>削除</div>
                        </>
                    </Button>
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
        font-size: 30px;
    `,
    label: css`
        font-size: 25px;
    `,
    button: css`
        display: inline;
        width: 10vw;
        margin-right: 20px;
    `,
};

export default QuestionFolder;
