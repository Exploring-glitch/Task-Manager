import { Cell, Label, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import CustomCenterLabel from "./CustomCenterLabel.jsx";
import CustomLegend from "./CustomLegend.jsx";
import CustomToolTip from "./CustomToolTip.jsx";

const CustomPieChart = ({ data = [], colors = [] }) => {
    const total = data.reduce((sum, item) => sum + item.count, 0);

    const legendPayload = data.map((entry, index) => ({
        id: entry.status,
        value: entry.status,
        type: "circle",
        color: colors[index % colors.length] || "#6366f1",
    }));

    return (
        <ResponsiveContainer width="100%" height={360}>
            <PieChart margin={{ top: 24, bottom: 8 }}>
                <Pie
                    data={data}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="45%"
                    outerRadius={116}
                    innerRadius={86}
                    paddingAngle={4}
                    cornerRadius={6}
                    stroke="#ffffff"
                    strokeWidth={2}
                    labelLine={false}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${entry.status}-${index}`}
                            fill={colors[index % colors.length] || "#6366f1"}
                        />
                    ))}

                    <Label content={(props) => <CustomCenterLabel {...props} total={total} />} />
                </Pie>

                <Tooltip content={<CustomToolTip />} />
                <Legend
                    content={<CustomLegend />}
                    payload={legendPayload}
                    verticalAlign="bottom"
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CustomPieChart;
