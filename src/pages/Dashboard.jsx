import { useSelector } from "react-redux";
import { useState, useRef, useMemo } from "react";
import "../styles/Dashboard.css";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Map from "../components/Map";
import ImageGrid from "../components/ImageGrid";

export default function Dashboard() {
    const { t } = useTranslation();
    const user = useSelector((state) => state.user.currentUser);
    const arr = ["a", "b", "c", "a", "a", "c", "a", "b", "d", "a", "b", "c", "a", "c", "c", "d"];
    const arr2 = [{ a: 1 }, { a: 2 }, { a: 1 }];
    const [result, setResult] = useState(null);
    const workerRef = useRef(null);

    const stats = [
        { title: "Users", value: "1,204", icon: "👥", action: () => alert("Go to Users page") },
        { title: "Revenue", value: "$12,430", icon: "💰", action: () => alert("View Revenue details") },
        { title: "Active", value: "87%", icon: "📈", action: () => alert("Check Active metrics") },
        { title: "Tasks", value: "23", icon: "📝", action: () => alert("View Tasks") },
    ];

    const images = [
        { src: '/assets/number_1.png', alt: 'Number1' },
        { src: '/assets/number_2.png', alt: 'Number2' },
        { src: '/assets/number_3.png', alt: 'Number3' },
        { src: '/assets/number_4.png', alt: 'Number4' },
    ]

    const counts = useMemo(() => {
      return arr.reduce((acc, char) => {
        acc[char] = (acc[char] || 0) + 1;
        return acc;
      }, {});
    }, [arr]);

    const confirmQ3 = () => {
        setResult(counts);
        // const count = {}
        // for (let char of arr) {
        //     count[char] = (count[char] || 0) + 1;
        // }

        // const counts2 = arr2.reduce((acc, obj) => {
        //     const key = JSON.stringify(obj);
        //     acc[key] = (acc[key] || 0) + 1;
        //     return acc;
        // }, {});
        // console.log('counts2', counts2)

    //     workerRef.current = new Worker(
    //       new URL("../workers/countWorker.js", import.meta.url)
    //    );
    
    //    workerRef.current.postMessage(arr);
    
    //     workerRef.current.onmessage = (e) => {
    //       setResult(e.data);
    //       workerRef.current.terminate(); // cleanup
    //     };
    };

    const Arryname = [
        { name: 'chong', score: 80 },
        { name: 'leo', score: 70 },
        { name: 'leong', score: 100 },
    ]

    const runme = () => {
        const obj = {}
        Arryname.map(char => {
            return obj[char.name] = char.score
        })
        console.log('obj', obj)
    }

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

            <ImageGrid images={images} cols={'4'} gap={4} />

            <button className="btn" onClick={confirmQ3}>
                Confirm
            </button>

            <button className="btn" onClick={runme}>
                halo
            </button>

            {result && (
                <div className="result">
                    {Object.entries(result).map(([key, value]) => (
                        <div key={key}>
                            {key}: {value}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
