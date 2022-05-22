import { FC } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const QuestionNameListItem: FC<{
    data: {
        id: string;
        name: string;
        questions: string[];
    };
    onClick?: () => void;
}> = ({ data, onClick = () => undefined }) => {
    return (
        <>
            <ListItem>
                <ListItemButton style={{ width: "100vw" }} onClick={onClick}>
                    <ListItemText>{data.name}</ListItemText>
                </ListItemButton>
            </ListItem>
            <Divider />
        </>
    );
};

export default QuestionNameListItem;
