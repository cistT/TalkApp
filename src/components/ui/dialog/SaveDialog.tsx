import { FC, useRef, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import { DialogContent } from "@mui/material";

type Props = {
    title?: string;
    inputLabel?: string;
    save: (newDataId: string, newdata: string) => void;
};

const SaveDialog: FC<Props> = ({
    title = "追加する",
    inputLabel = "",
    save,
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
                variant="outlined"
                onClick={handleClickOpen}
                style={{ height: "60px", width: "50vw" }}
            >
                追加する
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <div>{inputLabel}</div>
                    <input
                        ref={inputRef}
                        style={{
                            width: "100%",
                            height: "40px",
                            fontSize: "5vh",
                        }}
                    />
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

export default SaveDialog;
