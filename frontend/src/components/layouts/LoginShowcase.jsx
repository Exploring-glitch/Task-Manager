import {
    LuArrowUpRight,
    LuCheck,
    LuCircleDot,
    LuClock3,
    LuLockKeyhole,
    LuShieldCheck,
    LuSparkles,
} from "react-icons/lu";

const TASKS = [
    { label: "Finalize Q3 roadmap", meta: "Done", tone: "done", icon: LuCheck },
    { label: "Review design handoff", meta: "In review", tone: "progress", icon: LuClock3 },
    { label: "Update onboarding docs", meta: "Tomorrow", tone: "todo", icon: LuCircleDot },
];

const TONE_CLASSES = {
    done: "bg-emerald-400/15 text-emerald-300",
    progress: "bg-amber-400/15 text-amber-200",
    todo: "bg-sky-400/15 text-sky-200",
};

const LoginShowcase = () => {
    return (
        <aside
            className="relative hidden overflow-hidden bg-slate-950 lg:flex lg:w-[46%] xl:w-[48%]"
            aria-label="Product overview"
        >
            <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
            <div
                className="absolute -top-28 -left-20 h-80 w-80 rounded-full bg-indigo-600/30 blur-3xl"
                aria-hidden="true"
            />
            <div
                className="absolute -right-24 -bottom-28 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl"
                aria-hidden="true"
            />

            <div className="relative flex h-full w-full flex-col justify-center px-10 py-14 xl:px-16">
                <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-indigo-200">
                        <LuSparkles className="text-sm" aria-hidden="true" />
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                        TaskManager workspace
                    </span>
                </div>

                <h2 className="mt-8 max-w-md text-4xl leading-[1.12] font-bold text-white xl:text-[44px]">
                    One clear view of
                    <br />
                    <span className="text-gradient-bright">every task.</span>
                </h2>

                <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
                    Assign work, follow progress and keep the whole team in sync — without the
                    noise.
                </p>

                <div className="mt-9 max-w-md rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Today
                            </p>
                            <p className="mt-1 text-base font-semibold text-white">Team progress</p>
                        </div>

                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
                            <LuArrowUpRight className="text-base" aria-hidden="true" />
                        </span>
                    </div>

                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div
                            className="h-full w-3/4 rounded-full bg-linear-to-r from-indigo-400 to-sky-300"
                            aria-hidden="true"
                        />
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                        <span>6 of 8 tasks complete</span>
                        <span className="font-semibold text-slate-200">75%</span>
                    </div>

                    <ul className="mt-5 space-y-2.5">
                        {TASKS.map(({ label, meta, tone, icon: Icon }) => (
                            <li
                                key={label}
                                className="flex items-center gap-3 rounded-xl border border-white/5 bg-slate-950/40 px-3.5 py-2.5"
                            >
                                <span
                                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${TONE_CLASSES[tone]}`}
                                >
                                    <Icon className="text-sm" aria-hidden="true" />
                                </span>

                                <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-slate-100">
                                    {label}
                                </span>

                                <span className="shrink-0 text-[11px] text-slate-400">{meta}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-2">
                        <LuShieldCheck className="text-emerald-400" aria-hidden="true" />
                        Secure sessions
                    </span>

                    <span className="inline-flex items-center gap-2">
                        <LuLockKeyhole className="text-emerald-400" aria-hidden="true" />
                        Role-based access
                    </span>
                </div>
            </div>
        </aside>
    );
};

export default LoginShowcase;
