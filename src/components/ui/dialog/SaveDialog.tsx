import { FC, useRef, useState } from "react";

import { css } from "@emotion/react";

import { v4 as uuidv4 } from "uuid";

import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import { DialogContent, SvgIconProps } from "@mui/material";

type Props = {
    title?: string;
    inputLabel?: string;
    save: (newDataId: string, newdata: string) => void;
    buttonIcon?: React.HTMLProps<SvgIconProps> | undefined;
};

const SaveDialog: FC<Props> = ({
    title = "追加する",
    inputLabel = "",
    save,
    buttonIcon = undefined,
}) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const inputRef = useRef<HTMLInputElement>(null);

    const saveQuestionList = () => {
        if (inputRef.current !== null) {
            if (inputRef.current.value === "") return;
            save(uuidv4(), inputRef.current.value);
            inputRef.current.value = "";
        }
    };
    return (
        <>
            <Button
                css={styles.addButton}
                variant="outlined"
                onClick={handleClickOpen}
            >
                <>
                    {buttonIcon}
                    追加する
                </>
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <div>{inputLabel}</div>
                    <input ref={inputRef} css={styles.input} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">
                        戻る
                    </Button>
                    <Button onClick={saveQuestionList} variant="outlined">
                        保存する
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

const styles = {
    addButton: css`
        height: 60px;
        width: 50vw;
        transition: all 0.5s;
        :hover {
            background-color: rgba(35, 133, 252, 0.3);
        }
    `,
    input: css`
        height: 40px;
        width: 100%;
        font-size: 5vh;
    `,
};

export default SaveDialog;
