import { FC } from "react";
import Header from "./components/Header";
import MainScreen from "./components/MainScreen";

const App:FC<{}>=()=> {
  return (
    <>
      <Header />
      <MainScreen />
    </>
  );
}

export default App;
