
const CustomCenterLabel = ({ viewBox, total }) => {
  if (!viewBox) return null;

  const { cx, cy } = viewBox;

  return (
    <g>
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: "28px", fontWeight: "bold", fill: "#111" }}
      >
        {total}
      </text>

      <text
        x={cx}
        y={cy + 22}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: "14px", fill: "#666" }}
      >
        Total Tasks
      </text>
    </g>
  );
};


export default CustomCenterLabel;