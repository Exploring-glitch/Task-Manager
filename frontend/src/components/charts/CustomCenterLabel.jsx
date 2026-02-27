import React from "react";

const CustomCenterLabel = ({ viewBox, total }) => {
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
};

export default CustomCenterLabel;