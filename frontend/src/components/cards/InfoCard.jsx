const TONE_CLASSES = {
    primary: "bg-primary-soft text-primary ring-primary/10",
    amber: "bg-amber-50 text-amber-600 ring-amber-100",
    sky: "bg-sky-50 text-sky-600 ring-sky-100",
    emerald: "bg-emerald-50 text-emerald-600 ring-emerald-100",
};

const InfoCard = ({ label, value, hint, tone = "primary", icon: Icon }) => {
    return (
        <div className="group surface-card surface-hover relative overflow-hidden p-5">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="truncate text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                        {label}
                    </p>

                    <p className="mt-2.5 text-3xl font-bold tracking-tight text-ink">{value}</p>
                </div>

                {Icon && (
                    <span
                        className={`icon-tile h-11 w-11 rounded-xl ring-1 ${TONE_CLASSES[tone] || TONE_CLASSES.primary}`}
                    >
                        <Icon className="text-xl" aria-hidden="true" />
                    </span>
                )}
            </div>

            {hint && <p className="mt-3 text-xs leading-5 text-slate-500">{hint}</p>}

            <span
                className="pointer-events-none absolute -right-6 -bottom-6 h-20 w-20 rounded-full bg-slate-50 transition group-hover:bg-primary-soft/70"
                aria-hidden="true"
            />
        </div>
    );
};

export default InfoCard;
