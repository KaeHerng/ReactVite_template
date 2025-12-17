import { useState } from "react";
import "../styles/settings.css";

export default function Settings() {
    const [username, setUsername] = useState("John Doe");
    const [email, setEmail] = useState("john@example.com");
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);

    return (
        <div className="settings-grid">
            {/* Profile Card */}
            <div className="settings-card">
                <h3>Profile Settings</h3>
                <label>
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    Email
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <button onClick={() => alert("Profile Updated!")}>Save</button>
            </div>

            {/* Theme Card */}
            <div className="settings-card">
                <h3>Theme</h3>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                    />
                    <span className="slider"></span>
                </label>
                <p>{darkMode ? "Dark Mode" : "Light Mode"}</p>
            </div>

            {/* Notifications Card */}
            <div className="settings-card">
                <h3>Notifications</h3>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={notifications}
                        onChange={() => setNotifications(!notifications)}
                    />
                    <span className="slider"></span>
                </label>
                <p>{notifications ? "Enabled" : "Disabled"}</p>
            </div>

            {/* Account Actions Card */}
            <div className="settings-card">
                <h3>Account Actions</h3>
                <button
                    className="danger"
                    onClick={() => alert("Logged out!")}
                >
                    Logout
                </button>
                <button
                    className="danger"
                    onClick={() => alert("Account deleted!")}
                >
                    Delete Account
                </button>
            </div>
        </div>
    );
}
