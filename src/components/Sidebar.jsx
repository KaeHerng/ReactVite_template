import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar({ open, onClose }) {
    return (
        <>
            <div
                className={`sidebar-backdrop ${open ? "visible" : ""}`}
                onClick={onClose}
            ></div>

            <aside className={`sidebar ${open ? "open" : ""}`}>
                <div className="sidebar-logo">MyApp</div>

                <nav className="sidebar-nav">
                    <NavLink
                        to="/"
                        end
                        onClick={onClose}
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/settings"
                        onClick={onClose}
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Settings
                    </NavLink>

                    <NavLink
                        to="/tables"
                        onClick={onClose}
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        tables
                    </NavLink>

                    <NavLink
                        to="/analytics"
                        onClick={onClose}
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Analytics
                    </NavLink>
                </nav>
            </aside>
        </>
    );
}
