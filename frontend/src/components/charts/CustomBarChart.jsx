import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const CustomToolTip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;

    return (
        <div className="rounded-lg border border-gray-300 bg-white p-2 shadow-md">
            <p className="mb-1 text-xs font-semibold text-purple-800">
                {payload[0].payload.priority}
            </p>
            <p className="text-sm text-gray-600">
                Count:{" "}
                <span className="text-sm font-medium text-gray-900">
                    {payload[0].payload.count}
                </span>
            </p>
        </div>
    );
};

const BAR_COLORS = {
    Low: "#00BC7D",
    Medium: "#FE9900",
    High: "#FF1F57",
};

const CustomBarChart = ({ data = [] }) => {
    return (
        <div className="mt-6 bg-white">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke="none" />

                    <XAxis dataKey="priority" tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
                    <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />

                    <Tooltip content={<CustomToolTip />} cursor={{ fill: "transparent" }} />

                    <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell
                                key={`bar-${entry.priority}-${index}`}
                                fill={BAR_COLORS[entry.priority] || BAR_COLORS.Low}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomBarChart;
