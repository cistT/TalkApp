import { FC } from "react";

import { css, keyframes } from "@emotion/react";

import List from "@mui/material/List";

import QuestionFolder from "./item/QuestionFolder";
import SaveDialog from "../../ui/dialog/SaveDialog";
import QuestionStore from "../../types/QuestionStoreType";
import QuadrangleButton from "../../ui/button/QuadrangleButton";

type Props = {
    questionsStore: QuestionStore;
    openMainScreen: () => void;
    createFolder: (newDataId: string, newdata: string) => void;
    deleteFolder: (folderId: string) => void;
    setQuestionListItem: (item: string) => void;
    openItemList: () => void;
};

const QuestionFolders: FC<Props> = ({
    questionsStore,
    openMainScreen,
    createFolder,
    deleteFolder,
    setQuestionListItem,
    openItemList,
}) => {
    const onClick = (folderId: string) => {
        setQuestionListItem(folderId);
        openItemList();
    };

    return (
        <div css={styles.content}>
            <List>
                {questionsStore.map((data) => (
                    <QuestionFolder
                        id={data.id}
                        name={data.name}
                        deleteButton={data.id.length > 1}
                        onClick={() => onClick(data.id)}
                        deleteFolder={deleteFolder}
                        key={data.id}
                    />
                ))}
            </List>
            <QuadrangleButton
                label="戻る"
                variant="outlined"
                emotion={styles.button}
                onClick={openMainScreen}
            />
            <SaveDialog
                save={createFolder}
                title="フォルダをを作成する"
                inputLabel="フォルダ名を入力してください"
            />
        </div>
    );
};

export default QuestionFolders;

const keyframe = {
    content: keyframes`
        0%{
            opacity:0;
            transform:scale(0.5);
        }
        100%{
            opacity:1;
            transform:scale(1);
        }
    `,
};

const styles = {
    content: css`
        animation-name: ${keyframe.content};
        animation-duration: 0.75s;
        animation-timing-function: ease;
    `,
    button: css`
        height: 60px;
        width: 50vw;
        float: right;
        transition: all 0.5s;
        :hover {
            background-color: rgba(35, 133, 252, 0.3);
        }
    `,
};
