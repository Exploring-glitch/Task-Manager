import React from 'react'
import { Pie, Cell, Tooltip, ResponsiveContainer, Legend, PieChart, Label } from 'recharts';
import CustomToolTip from './CustomToolTip.jsx';
import CustomLegend from './CustomLegend.jsx';
import CustomCenterLabel from './CustomCenterLabel.jsx';

const CustomPieChart = ({ data, colors }) => {
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
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]}></Cell>
          ))}

          <Label
            content={(props) => <CustomCenterLabel {...props} total={total} />}
          />
        </Pie>

        <Tooltip content={<CustomToolTip />}></Tooltip>
        <Legend content={<CustomLegend />}></Legend>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default CustomPieChart