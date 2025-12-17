import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../redux/userSlice"; // 引入 Redux action
import "../styles/navbar.css";

export default function Navbar({ onMenu }) {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutAction()); // 触发 Redux 清空 user
        navigate("/login");       // 跳转回 login
    };

    return (
        <header className="navbar">
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <button className="menu-btn" onClick={onMenu}>☰</button>
                <span className="navbar-title">Dashboard</span>
                <div className="navbar-search">
                    <input type="text" placeholder="Search..." />
                </div>
            </div>

            <div className="navbar-actions">
                <button className="notif-btn">🔔<span className="notif-badge">3</span></button>

                <div className="user-menu-wrapper">
                    <img
                        className="user-avatar"
                        src="https://i.pravatar.cc/40"
                        alt="User"
                        onClick={() => setShowUserMenu(!showUserMenu)}
                    />
                    {showUserMenu && (
                        <div className="user-dropdown">
                            <a>Profile</a>
                            <a>Settings</a>
                            <a onClick={handleLogout}>Logout</a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
