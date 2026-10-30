import {
    LuFileSpreadsheet,
    LuListChecks,
    LuShieldCheck,
    LuSparkles,
    LuUsers,
} from "react-icons/lu";
import NavBar from "./NavBar.jsx";

const FEATURES = [
    {
        icon: LuListChecks,
        title: "Clear checklists",
        description: "Break work into steps and watch progress update itself.",
    },
    {
        icon: LuUsers,
        title: "Shared visibility",
        description: "Admins assign, members execute, everyone stays aligned.",
    },
    {
        icon: LuFileSpreadsheet,
        title: "Reports on demand",
        description: "Export tasks and team stats to Excel in one click.",
    },
];

const AuthLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen flex-col">
            <NavBar />

            <div className="flex flex-1">
                <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8 lg:px-12">
                    <div className="animate-fade-up w-full max-w-lg">{children}</div>
                </main>

                <aside className="relative hidden overflow-hidden bg-slate-950 lg:flex lg:w-[46%] xl:w-[48%]">
                    <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
                    <div
                        className="absolute -top-24 -left-16 h-80 w-80 rounded-full bg-indigo-600/40 blur-3xl"
                        aria-hidden="true"
                    />
                    <div
                        className="absolute right-0 -bottom-32 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl"
                        aria-hidden="true"
                    />

                    <div className="relative flex h-full flex-col justify-center px-10 py-16 xl:px-16">
                        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-indigo-100 backdrop-blur">
                            <LuSparkles className="text-sm" aria-hidden="true" />
                            Built for focused teams
                        </span>

                        <h2 className="mt-6 max-w-md text-4xl font-bold leading-[1.12] text-white xl:text-[44px]">
                            Plan the work.
                            <br />
                            <span className="text-gradient-bright">Track the progress.</span>
                        </h2>

                        <p className="mt-5 max-w-md text-sm leading-6 text-slate-300">
                            A calm, single home for tasks, checklists and team pulse — so nothing slips
                            between updates.
                        </p>

                        <ul className="mt-9 space-y-3.5">
                            {FEATURES.map(({ icon: Icon, title, description }) => (
                                <li
                                    key={title}
                                    className="flex gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-4 backdrop-blur-sm"
                                >
                                    <span className="icon-tile h-10 w-10 rounded-xl bg-white/10 text-indigo-200">
                                        <Icon className="text-lg" aria-hidden="true" />
                                    </span>

                                    <div>
                                        <p className="text-sm font-semibold text-white">{title}</p>
                                        <p className="mt-1 text-xs leading-5 text-slate-400">{description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-9 flex flex-wrap items-center gap-6 border-t border-white/10 pt-6 text-xs text-slate-400">
                            <span className="inline-flex items-center gap-2">
                                <LuShieldCheck className="text-emerald-400" aria-hidden="true" />
                                Secure sessions
                            </span>

                            <span className="inline-flex items-center gap-2">
                                <LuUsers className="text-emerald-400" aria-hidden="true" />
                                Role based access
                            </span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default AuthLayout;
