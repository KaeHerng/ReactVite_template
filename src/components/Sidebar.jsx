import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";
import { useTranslation } from "react-i18next";

export default function Sidebar({ open, onClose, collapsed }) {
    const { t } = useTranslation();
    const links = [
        { to: "/", label: "nav.dashboard", icon: "📊" },
        { to: "/settings", label: "nav.settings", icon: "⚙️" },
        { to: "/tables", label: "nav.tables", icon: "📋" },
        { to: "/analytics", label: "nav.analytics", icon: "📈" },
    ];

    return (
        <>
            <div
                className={`sidebar-backdrop ${open ? "visible" : ""}`}
                onClick={onClose}
            ></div>

            <aside className={`sidebar ${open ? "open" : ""}`}>
                <div className="sidebar-logo">{collapsed ? "🟦" : "MyApp"}</div>

                <nav className="sidebar-nav">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end
                            onClick={onClose}
                            className={({ isActive }) => (isActive ? "active" : "")}>
                            <span className="sidebar-icon">{link.icon}</span>
                            {!collapsed && <span className="sidebar-label">{t(link.label)}</span>}
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
}
