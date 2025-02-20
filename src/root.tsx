import AppNavbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <AppNavbar/>
      <Outlet />
    </>
  );
};

export default RootLayout