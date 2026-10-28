import NavBar from "./NavBar.jsx";

const FEATURES = [
    "Assign tasks to your team in seconds",
    "Track progress with live checklists",
    "Export task and member reports",
];

const AuthLayout = ({ children }) => {
    return (
        <div className="flex h-screen flex-col">
            <NavBar />

            <div className="min-h-[calc(100vh-52px)] w-screen overflow-x-hidden bg-linear-to-br from-[#F8FAFC] via-[#EEF4FF] to-[#E8F0FF]">
                <div className="h-full w-full lg:w-1/2">{children}</div>

                <aside className="relative hidden h-screen w-1/2 flex-col justify-center overflow-hidden bg-[#1D4ED8] p-12 text-white lg:fixed lg:top-0 lg:right-0 lg:flex">
                    <div className="relative z-10 max-w-md">
                        <p className="text-sm font-semibold tracking-wide text-blue-200 uppercase">
                            Task Manager
                        </p>

                        <h2 className="mt-4 text-4xl font-bold leading-tight">
                            Plan the work. Track the progress.
                        </h2>

                        <p className="mt-4 text-blue-100">
                            A simple workspace for admins and teams to keep every task moving.
                        </p>

                        <ul className="mt-8 space-y-4">
                            {FEATURES.map((feature) => (
                                <li key={feature} className="flex items-start gap-3 text-sm text-blue-50">
                                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-300" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-blue-500/40 blur-2xl" />
                    <div className="pointer-events-none absolute -top-20 -left-16 h-72 w-72 rounded-full bg-blue-400/30 blur-2xl" />
                </aside>
            </div>
        </div>
    );
};

export default AuthLayout;
