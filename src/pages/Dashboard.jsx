import { useSelector } from "react-redux";
import "../styles/Dashboard.css";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Map from "../components/Map";

export default function Dashboard() {
    const { t } = useTranslation();
    const user = useSelector((state) => state.user.currentUser);

    const stats = [
        { title: "Users", value: "1,204", icon: "👥", action: () => alert("Go to Users page") },
        { title: "Revenue", value: "$12,430", icon: "💰", action: () => alert("View Revenue details") },
        { title: "Active", value: "87%", icon: "📈", action: () => alert("Check Active metrics") },
        { title: "Tasks", value: "23", icon: "📝", action: () => alert("View Tasks") },
    ];

    return (
        <div className="dashboard-container">
            <div className="dashboard-banner mb-6 rounded-xl shadow-sm">
                <h2 className="text-xl md:text-2xl font-semibold">
                    {t("dashboard.welcome")}, {user?.name || "Guest"}!
                </h2>
                <p className="text-sm md:text-base opacity-80">
                    {t("dashboard.overview")}
                </p>
            </div>

            <div className="dashboard-stats">
                <AnimatePresence>
                    {stats.map((stat) => (
                        <motion.div
                            key={stat.title}
                            className="dashboard-card"
                            onClick={stat.action}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            whileHover={{ scale: 1.05, boxShadow: "0px 8px 15px rgba(0,0,0,0.15)" }}
                            transition={{ duration: 0.3 }}>
                            <div className="card-icon">{stat.icon}</div>
                            <div className="card-title">{stat.title}</div>
                            <div className="card-value">{stat.value}</div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-gray-700 p-4 rounded">xx</div>
                <div className="bg-gray-700 p-4 rounded">xx</div>
            </div>

            <div className="dashboard-actions" style={{ marginBottom: 15 }}>
                <button onClick={() => alert("Creating new report...")}>Create Report</button>
                <button onClick={() => alert("Exporting data...")}>Export Data</button>
                <button onClick={() => alert("Refreshing stats...")}>Refresh Stats</button>
            </div>
            <Map />
        </div>
    );
}
