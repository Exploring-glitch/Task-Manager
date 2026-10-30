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

const BarTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;

    return (
        <div className="rounded-xl border border-line bg-white/95 px-3.5 py-2.5 shadow-card backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                {payload[0].payload.priority} priority
            </p>
            <p className="mt-1 text-sm text-slate-600">
                <span className="text-base font-bold text-ink">{payload[0].payload.count}</span> tasks
            </p>
        </div>
    );
};

const BAR_COLORS = {
    Low: "#10b981",
    Medium: "#f59e0b",
    High: "#f43f5e",
};

const CustomBarChart = ({ data = [] }) => {
    return (
        <div className="mt-4">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="4 6" vertical={false} stroke="#eef1f6" />

                    <XAxis
                        dataKey="priority"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 12, fill: "#64748b", fontWeight: 500 }}
                        dy={8}
                    />

                    <YAxis
                        allowDecimals={false}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11, fill: "#94a3b8" }}
                    />

                    <Tooltip content={<BarTooltip />} cursor={{ fill: "rgba(99,102,241,0.06)" }} />

                    <Bar dataKey="count" radius={[8, 8, 2, 2]} maxBarSize={56}>
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
