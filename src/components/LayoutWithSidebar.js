import Sidebar from "./Dash/Sidebar.js";
import {Outlet} from "react-router-dom";

const LayoutWithSidebar = () => {
    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default LayoutWithSidebar