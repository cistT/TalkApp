import { FC } from "react";
import { BrowserRouter } from "react-router-dom";

import Header from "./components/ui/header/Header";
import MainScreen from "./components/page/MainScreen";

import backgroundImage from "./assets/img/leaves.png";

const App: FC = () => {
    return (
        <>
            <Header />
            <BrowserRouter>
                <MainScreen />
            </BrowserRouter>
        </>
    );
};

export default App;
