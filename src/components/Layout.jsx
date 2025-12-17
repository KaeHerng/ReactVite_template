import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../styles/layout.css";

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const closeSidebar = () => setSidebarOpen(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className="layout">
            <Sidebar open={sidebarOpen} onClose={closeSidebar} />
            <div className="main">
                <Navbar onMenu={toggleSidebar} />
                <main className="content">
                    {/* 必须用 Outlet 来渲染子路由 */}
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
