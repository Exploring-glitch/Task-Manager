const CustomLegend = ({ payload = [] }) => {
    return (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {payload.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center gap-2">
                    <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: entry.color }}
                        aria-hidden="true"
                    />
                    <span className="text-xs font-medium text-slate-600">{entry.value}</span>
                </div>
            ))}
        </div>
    );
};

export default CustomLegend;
