import { FC } from "react";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const QuestionListItem: FC<{
    question: string;
}> = ({ question }) => {
    return (
        <>
            <ListItem>
                <ListItemText style={{ width: "100vw" }}>
                    {question}
                </ListItemText>
            </ListItem>
            <Divider />
        </>
    );
};

export default QuestionListItem;
