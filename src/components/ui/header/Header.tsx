import { FC } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";

import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";

import SignOutButton from "../button/SignOutButton";
import SignInButton from "../button/SignInButton";

const Header: FC<{ title?: string }> = ({ title = "" }) => {
    const [user] = useAuthState(auth);

    return (
        <Box style={{ height: "60px" }} sx={{ flexGrow: 1 }} position="static">
            <AppBar>
                <Toolbar style={{ justifyContent: "space-between" }}>
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                    {user ? <SignOutButton /> : <SignInButton />}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
