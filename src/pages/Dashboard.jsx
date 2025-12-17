import { useSelector } from "react-redux";
import "../styles/Dashboard.css";

export default function Dashboard() {
    const user = useSelector((state) => state.user.currentUser);

    const stats = [
        { title: "Users", value: "1,204", icon: "👥", action: () => alert("Go to Users page") },
        { title: "Revenue", value: "$12,430", icon: "💰", action: () => alert("View Revenue details") },
        { title: "Active", value: "87%", icon: "📈", action: () => alert("Check Active metrics") },
        { title: "Tasks", value: "23", icon: "📝", action: () => alert("View Tasks") },
    ];

    return (
        <div className="dashboard-container">
            <div className="dashboard-banner">
                <h2>Welcome, {user?.name || "Guest"}!</h2>
                <p>Here's your dashboard overview. sss</p>
            </div>

            <div className="dashboard-stats">
                {stats.map((stat) => (
                    <div key={stat.title} className="dashboard-card" onClick={stat.action}>
                        <div className="card-icon">{stat.icon}</div>
                        <div className="card-title">{stat.title}</div>
                        <div className="card-value">{stat.value}</div>
                    </div>
                ))}
            </div>

            <div className="dashboard-actions">
                <button onClick={() => alert("Creating new report...")}>Create Report</button>
                <button onClick={() => alert("Exporting data...")}>Export Data</button>
                <button onClick={() => alert("Refreshing stats...")}>Refresh Stats</button>
            </div>
        </div>
    );
}
