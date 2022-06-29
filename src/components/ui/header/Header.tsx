import { FC } from "react";
import { css } from "@emotion/react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";

import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";

import SignOutButton from "../button/SignOutButton";
import SignInButton from "../button/SignInButton";

type Props = {
    title?: string;
    titleOnClick?: () => void;
};

const Header: FC<Props> = ({ title = "", titleOnClick = () => undefined }) => {
    const [user] = useAuthState(auth);

    return (
        <Box css={styles.box} position="static">
            <AppBar>
                <Toolbar css={styles.toolbar}>
                    <Typography
                        variant="h6"
                        component="div"
                        css={styles.title}
                        onClick={titleOnClick}
                    >
                        {title}
                    </Typography>
                    {user ? <SignOutButton /> : <SignInButton />}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

const styles = {
    box: css`
        height: 60px;
        flex-grow: 1;
    `,
    toolbar: css`
        justify-content: space-between;
    `,
    title: css`
        font-family: "Joan", serif;
        :hover {
            cursor: pointer;
        }
    `,
};

export default Header;
