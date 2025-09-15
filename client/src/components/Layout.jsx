import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  return (
    <div>
      {!isDashboard && <Navbar />}
      <main>
        <Outlet />
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
};

export default Layout;
