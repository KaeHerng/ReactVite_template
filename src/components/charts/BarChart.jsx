import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell
} from "recharts";

const COLORS = ["#10b981", "#f97316", "#3b82f6", "#ef4444"];

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

const OfferBarChart = ({ stats }) => {
  const data = [
    { name: "Accepted", value: stats.accepted },
    { name: "Rejected", value: stats.rejected },
    { name: "No Offer", value: stats.noOffer },
    { name: "No Response", value: stats.noResponse },
  ];

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data} barSize={40}>
          {/* grid 更淡 */}
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />

          {/* X axis */}
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          {/* Y axis */}
          <YAxis
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
          />

          {/* tooltip */}
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />

          {/* bars */}
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OfferBarChart;