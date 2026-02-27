import React from 'react'
import { Pie, Cell, Tooltip, ResponsiveContainer, Legend, PieChart, Label } from 'recharts';
import CustomToolTip from './CustomToolTip.jsx';

const CustomPieChart = ({ data, colors }) => {
  const total = data.reduce((sum, item) => sum + item.count, 0);


  return (
    <ResponsiveContainer width="100%" height={325}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="status"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]}></Cell>
          ))}

          {/* CENTER LABEL IN PIE CHART */}
          <Label
            content={({ viewBox }) => {
              const { cx, cy } = viewBox;

              return (
                <>
                  <text
                    x={cx}
                    y={cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ fontSize: "28px", fontWeight: "bold", fill: "#111" }}
                  >
                    {total}
                  </text>

                  <text
                    x={cx}
                    y={cy + 20}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ fontSize: "14px", fill: "#666" }}
                  >
                    Total Tasks
                  </text>
                </>
              );
            }}
          />
        </Pie>

        <Tooltip content={<CustomToolTip />}></Tooltip>
        <Legend content={<CustomLegend />}></Legend>

      </PieChart>
    </ResponsiveContainer>
  )
}

export default CustomPieChart