import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../styles/layout.css";

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(true); // 桌面默认展开
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // 桌面收起

    const toggleSidebar = () => {
        if (window.innerWidth <= 1024) {
            setSidebarCollapsed(false)
            setSidebarOpen(!sidebarOpen); // 移动端 overlay
        } else {
            setSidebarCollapsed(!sidebarCollapsed); // 桌面端收起/展开
        }
    };

    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className={`layout ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
            <Sidebar open={sidebarOpen} onClose={closeSidebar} />
            <div className="main">
                <Navbar onMenu={toggleSidebar} />
                <main className="content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

