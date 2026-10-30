const CustomToolTip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;

    return (
        <div className="rounded-xl border border-line bg-white/95 px-3.5 py-2.5 shadow-card backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                {payload[0].name}
            </p>
            <p className="mt-1 text-sm text-slate-600">
                <span className="text-base font-bold text-ink">{payload[0].value}</span> tasks
            </p>
        </div>
    );
};

export default CustomToolTip;
