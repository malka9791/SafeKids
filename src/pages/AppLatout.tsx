import { Outlet } from "react-router";
import {Header} from "./header";

const AppLayOut = () => {
  return (
    <>
          <Header />
          <Outlet />
    </>
  );
};

export default AppLayOut;
