import { FC } from "react";

import { AppBar, Box, Button, Toolbar, Typography } from "@material-ui/core";

//タイトルを上のコンポーネントから持ってこれるようにする
const Header: FC<{}> = () => {
    return (
        <Box style={{ height: "60px" }} sx={{ flexGrow: 1 }} position="static">
            <AppBar>
                <Toolbar style={{ justifyContent: "space-between" }}>
                    <Typography variant="h6" component="div">
                        Talk-App (α版)
                    </Typography>
                    {/* <Button color="inherit">ログイン</Button> */}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;

//AppBar Demo
//https://mui.com/material-ui/react-app-bar/?msclkid=65a4beb2c3ba11ecbce891204043ad19
