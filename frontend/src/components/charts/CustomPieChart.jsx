import { Cell, Label, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import CustomCenterLabel from "./CustomCenterLabel.jsx";
import CustomLegend from "./CustomLegend.jsx";
import CustomToolTip from "./CustomToolTip.jsx";

const CustomPieChart = ({ data = [], colors = [] }) => {
    const total = data.reduce((sum, item) => sum + item.count, 0);

    return (
        <ResponsiveContainer width="100%" height={380}>
            <PieChart margin={{ top: 20, bottom: 20 }}>
                <Pie
                    data={data}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    innerRadius={90}
                    labelLine={false}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${entry.status}-${index}`}
                            fill={colors[index % colors.length] || "#8D51FF"}
                        />
                    ))}

                    <Label content={(props) => <CustomCenterLabel {...props} total={total} />} />
                </Pie>

                <Tooltip content={<CustomToolTip />} />
                <Legend content={<CustomLegend />} />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CustomPieChart;
