import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend
} from "recharts";

const COLORS = ["#3b82f6", "#f97316", "#10b981"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#111",
          color: "#fff",
          padding: "8px 12px",
          borderRadius: "8px",
          fontSize: "12px",
        }}
      >
        <strong>{payload[0].name}</strong>
        <div>{payload[0].value}</div>
      </div>
    );
  }
  return null;
};

const OfferPieChart = ({ stats }) => {
  const data = [
    { name: "Interview", value: stats.interview },
    { name: "Pending", value: stats.pending },
    { name: "Completed", value: stats.completed },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div style={{ width: "100%", height: 300, position: "relative" }}>
      <ResponsiveContainer>
        <PieChart>
          {/* tooltip */}
          <Tooltip content={<CustomTooltip />} />

          {/* legend */}
          <Legend verticalAlign="bottom" height={36} />

          {/* pie */}
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            innerRadius={60}
            paddingAngle={3}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* center text (modern dashboard style) */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <div style={{ fontSize: "18px", fontWeight: "bold" }}>{total}</div>
        <div style={{ fontSize: "12px", color: "#666" }}>Total</div>
      </div>
    </div>
  );
};

export default OfferPieChart;