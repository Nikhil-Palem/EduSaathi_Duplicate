import React from "react";
import Navbar from "./Navbar"
import { Outlet } from "react-router-dom";
import Footer from "../../components/Dash/footer-dashboard.js"
const DashboardLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="dashboard-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;