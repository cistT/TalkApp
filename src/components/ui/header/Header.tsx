import { FC } from "react";

import { AppBar, Box, Button, Toolbar, Typography } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import SignOutButton from "../button/SignOutButton";
import SignInButton from "../button/SignInButton";

//タイトルを上のコンポーネントから持ってこれるようにする
const Header: FC<{}> = () => {
    const [user] = useAuthState(auth);

    return (
        <Box style={{ height: "60px" }} sx={{ flexGrow: 1 }} position="static">
            <AppBar>
                <Toolbar style={{ justifyContent: "space-between" }}>
                    <Typography variant="h6" component="div">
                        Talk-App (α版)
                    </Typography>
                    {/* {<img src={auth.currentUser?.photoURL ?? undefined} />} */}
                    {user ? <SignOutButton /> : <SignInButton />}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;

//AppBar Demo
//https://mui.com/material-ui/react-app-bar/?msclkid=65a4beb2c3ba11ecbce891204043ad19
