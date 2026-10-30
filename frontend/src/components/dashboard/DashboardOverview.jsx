import { useMemo } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import {
    LuArrowRight,
    LuCircleCheck,
    LuClock,
    LuListChecks,
    LuLoaderCircle,
    LuPlus,
} from "react-icons/lu";
import InfoCard from "../cards/InfoCard.jsx";
import PageLoader from "../PageLoader.jsx";
import TaskListTable from "../TaskListTable.jsx";
import CustomBarChart from "../charts/CustomBarChart.jsx";
import CustomPieChart from "../charts/CustomPieChart.jsx";
import { useUser } from "../../hooks/useUser.js";
import { formatNumber } from "../../util/format.js";

const COLORS = ["#f59e0b", "#0ea5e9", "#10b981"];

const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
};

const DashboardOverview = ({ data, loading, seeMorePath, seeMoreLabel = "See all tasks" }) => {
    const { user } = useUser();

    const { pieChartData, barChartData, distributions, completionRate, totalTasks } = useMemo(() => {
        const taskDistributions = data?.charts?.taskDistributions || {};
        const taskPriorityLevels = data?.charts?.taskPriorityLevels || {};
        const total = taskDistributions.All || 0;
        const completed = taskDistributions.Completed || 0;

        return {
            distributions: taskDistributions,
            totalTasks: total,
            completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
            pieChartData: [
                { status: "Pending", count: taskDistributions.Pending || 0 },
                { status: "In Progress", count: taskDistributions.InProgress || 0 },
                { status: "Completed", count: taskDistributions.Completed || 0 },
            ],
            barChartData: [
                { priority: "Low", count: taskPriorityLevels.Low || 0 },
                { priority: "Medium", count: taskPriorityLevels.Medium || 0 },
                { priority: "High", count: taskPriorityLevels.High || 0 },
            ],
        };
    }, [data]);

    if (loading) {
        return <PageLoader label="Loading dashboard..." />;
    }

    const isAdmin = user?.role === "admin";
    const firstName = user?.name?.split(" ")[0];

    return (
        <>
            <div className="flex flex-col gap-4 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="page-eyebrow">{moment().format("dddd, D MMMM YYYY")}</p>

                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-[28px]">
                        {getGreeting()}
                        {firstName ? `, ${firstName}` : ""}
                    </h1>

                    <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
                        {isAdmin
                            ? "Here is how your team is tracking today."
                            : "Here is a snapshot of the work assigned to you."}
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {isAdmin && (
                        <Link to="/admin/create-tasks" className="btn btn-primary">
                            <LuPlus className="text-base" aria-hidden="true" />
                            New task
                        </Link>
                    )}

                    {seeMorePath && (
                        <Link to={seeMorePath} className="btn btn-secondary">
                            View all
                            <LuArrowRight className="text-base" aria-hidden="true" />
                        </Link>
                    )}
                </div>
            </div>

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <InfoCard
                    label="Total tasks"
                    value={formatNumber(totalTasks)}
                    tone="primary"
                    icon={LuListChecks}
                    hint={`${completionRate}% of all work completed`}
                />
                <InfoCard
                    label="Pending"
                    value={formatNumber(distributions.Pending || 0)}
                    tone="amber"
                    icon={LuClock}
                    hint="Waiting to be picked up"
                />
                <InfoCard
                    label="In progress"
                    value={formatNumber(distributions.InProgress || 0)}
                    tone="sky"
                    icon={LuLoaderCircle}
                    hint="Actively moving right now"
                />
                <InfoCard
                    label="Completed"
                    value={formatNumber(distributions.Completed || 0)}
                    tone="emerald"
                    icon={LuCircleCheck}
                    hint="Delivered and checked off"
                />
            </section>

            <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-5">
                <section className="surface-card p-5 sm:p-6 xl:col-span-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <h2 className="text-base font-semibold text-ink">Task distribution</h2>
                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                Where the work currently stands.
                            </p>
                        </div>

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-500 ring-1 ring-line">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                            {formatNumber(totalTasks)} total
                        </span>
                    </div>

                    <CustomPieChart data={pieChartData} colors={COLORS} />
                </section>

                <section className="surface-card p-5 sm:p-6 xl:col-span-2">
                    <div>
                        <h2 className="text-base font-semibold text-ink">Priority levels</h2>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                            How urgent the open workload is.
                        </p>
                    </div>

                    <CustomBarChart data={barChartData} />
                </section>
            </div>

            <section className="surface-card mt-5 overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/80 px-5 py-4 sm:px-6">
                    <div>
                        <h2 className="text-base font-semibold text-ink">Recent tasks</h2>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                            The latest work created across your workspace.
                        </p>
                    </div>

                    {seeMorePath && (
                        <Link
                            to={seeMorePath}
                            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary-soft"
                        >
                            {seeMoreLabel}
                            <LuArrowRight className="text-sm" aria-hidden="true" />
                        </Link>
                    )}
                </div>

                <div className="p-4 sm:p-5">
                    <TaskListTable tableData={data?.recentTasks || []} />
                </div>
            </section>
        </>
    );
};

export default DashboardOverview;
