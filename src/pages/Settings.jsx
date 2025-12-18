import { useState } from "react";
import "../styles/settings.css";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function Settings() {
    const { t } = useTranslation();
    const [username, setUsername] = useState("John Doe");
    const [email, setEmail] = useState("john@example.com");
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <div className="settings-grid">
            {/* Profile Card */}
            <motion.div
                className="settings-card"
                initial="hidden"
                animate="visible"
                variants={cardVariants}>
                <h3>{t("settings.ProfileSettings")}</h3>
                <label>
                    {t("settings.Username")}
                    <input
                        className="input-design"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    {t("settings.Email")}
                    <input
                        className="input-design"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <button onClick={() => alert("Profile Updated!")}>Save</button>
            </motion.div>

            {/* Theme Card */}
            <motion.div
                className="settings-card"
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                transition={{ delay: 0.1 }}>
                <h3>{t("settings.Theme")}</h3>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                    />
                    <span className="slider"></span>
                </label>
                <p>{darkMode ? t("settings.DarkMode") : t("settings.LightMode")}</p>
            </motion.div>

            {/* Notifications Card */}
            <motion.div initial="hidden"
                animate="visible"
                variants={cardVariants}
                transition={{ delay: 0.2 }}
                className="settings-card">
                <h3>{t("settings.Notifications")}</h3>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={notifications}
                        onChange={() => setNotifications(!notifications)}
                    />
                    <span className="slider"></span>
                </label>
                <p>{notifications ? t("settings.Enable") : t("settings.Disable")}</p>
            </motion.div>

            {/* Account Actions Card */}
            <motion.div initial="hidden"
                animate="visible"
                variants={cardVariants}
                transition={{ delay: 0.3 }}
                className="settings-card">
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
            </motion.div>
        </div>
    );
}
