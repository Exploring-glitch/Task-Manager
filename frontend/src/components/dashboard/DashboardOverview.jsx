import { useMemo } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import InfoCard from "../cards/InfoCard.jsx";
import PageLoader from "../PageLoader.jsx";
import TaskListTable from "../TaskListTable.jsx";
import CustomBarChart from "../charts/CustomBarChart.jsx";
import CustomPieChart from "../charts/CustomPieChart.jsx";
import { useUser } from "../../hooks/useUser.js";
import { formatNumber } from "../../util/format.js";

const COLORS = ["#8D51FF", "#00B8DB", "#7BCE00"];

const DashboardOverview = ({ data, loading, seeMorePath, seeMoreLabel = "See All" }) => {
    const { user } = useUser();

    const { pieChartData, barChartData, distributions } = useMemo(() => {
        const taskDistributions = data?.charts?.taskDistributions || {};
        const taskPriorityLevels = data?.charts?.taskPriorityLevels || {};

        return {
            distributions: taskDistributions,
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

    return (
        <>
            <section className="my-3 rounded-2xl border border-gray-200/50 p-6 shadow-md shadow-gray-200">
                <h2 className="text-xl md:text-2xl">Hey! {user?.name}</h2>
                <p className="mt-1.5 text-xs text-gray-400 md:text-[13px]">
                    {moment().format("dddd Do MMM YYYY")}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-6 md:grid-cols-4 md:gap-6">
                    <InfoCard
                        label="Total Tasks"
                        value={formatNumber(distributions.All || 0)}
                        color="bg-primary"
                    />
                    <InfoCard
                        label="Pending Tasks"
                        value={formatNumber(distributions.Pending || 0)}
                        color="bg-violet-500"
                    />
                    <InfoCard
                        label="In Progress Tasks"
                        value={formatNumber(distributions.InProgress || 0)}
                        color="bg-cyan-500"
                    />
                    <InfoCard
                        label="Completed Tasks"
                        value={formatNumber(distributions.Completed || 0)}
                        color="bg-lime-500"
                    />
                </div>
            </section>

            <div className="my-4 grid grid-cols-1 gap-6 md:my-6 md:grid-cols-2">
                <section className="my-4 rounded-2xl border border-gray-200/50 p-6 shadow-md shadow-gray-200">
                    <h3 className="font-medium">Task Distribution</h3>
                    <CustomPieChart data={pieChartData} colors={COLORS} />
                </section>

                <section className="my-4 rounded-2xl border border-gray-200/50 p-6 shadow-md shadow-gray-200">
                    <h3 className="font-medium">Task Priority Levels</h3>
                    <CustomBarChart data={barChartData} />
                </section>

                <section className="md:col-span-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg">Recent Tasks</h3>

                        {seeMorePath && (
                            <Link
                                to={seeMorePath}
                                className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-blue-50 hover:text-primary"
                            >
                                {seeMoreLabel}
                                <LuArrowRight className="text-base" aria-hidden="true" />
                            </Link>
                        )}
                    </div>

                    <TaskListTable tableData={data?.recentTasks || []} />
                </section>
            </div>
        </>
    );
};

export default DashboardOverview;
