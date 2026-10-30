const CustomCenterLabel = ({ viewBox, total }) => {
    if (!viewBox) return null;

    const { cx, cy } = viewBox;

    return (
        <g>
            <text
                x={cx}
                y={cy - 4}
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                    fontSize: "30px",
                    fontWeight: 700,
                    fill: "#0f172a",
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                }}
            >
                {total}
            </text>

            <text
                x={cx}
                y={cy + 22}
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                    fontSize: "10px",
                    letterSpacing: "0.16em",
                    fill: "#94a3b8",
                    fontWeight: 600,
                    textTransform: "uppercase",
                }}
            >
                Total tasks
            </text>
        </g>
    );
};

export default CustomCenterLabel;
