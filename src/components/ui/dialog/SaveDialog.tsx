import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import { DialogContent } from "@mui/material";
import React, { FC, useState } from "react";

//エラー
// react_devtools_backend.js:4026 Warning: findDOMNode is deprecated in StrictMode.

const SaveDialog: FC<{
    title?: string;
    inputLabel?: string;
    save: (newdata: string) => void;
}> = ({ title = "追加する", inputLabel = "", save }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [folderName, setFolderName] = useState("");
    const saveQuestionList = () => {
        if (folderName === "") return;
        setFolderName(() => "");
        save(folderName);
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
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
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
