import React from "react";
import { Outlet } from "react-router-dom"; // This renders the page content based on active route
import Sidebar from "./Sidebar"; // Import Sidebar component
import Navbar from "../components/Navbar"
const Layout = () => {
  return (
   <>
    {/* <Navbar/> */}
    <div style={{ display: "flex" }}>
      {/* Sidebar will always be visible */}
     
      <Sidebar />

      <div style={{ flex: 1, padding: "20px" }}>
        {/* This is where the page content will go */}
        <Outlet />
      </div>
    </div>
    </>
  );
};

export default Layout;
