import React from "react";
import NavBar from "./Components/NavBar";
import FooterSection from "./Components/FooterSection";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <FooterSection />
    </>
  );
};

export default Layout;
