import { getStatusBadgeClasses } from "../../util/taskMeta.js";
import Avatar from "../ui/Avatar.jsx";

const UserCard = ({ userInfo }) => {
    return (
        <div className="surface-card surface-hover p-5">
            <div className="flex items-center gap-3.5">
                <Avatar
                    src={userInfo?.profileImageUrl}
                    name={userInfo?.name}
                    size="lg"
                    className="ring-4 ring-slate-50"
                />

                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">{userInfo?.name || "Unnamed member"}</p>
                    <p className="truncate text-xs text-slate-500">{userInfo?.email || "No email available"}</p>

                    <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-sky-700">
                        Member
                    </span>
                </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
                <StatCard label="Pending" count={userInfo?.pendingTask || 0} status="Pending" />
                <StatCard label="In progress" count={userInfo?.inProgressTask || 0} status="In Progress" />
                <StatCard label="Completed" count={userInfo?.completedTask || 0} status="Completed" />
            </div>
        </div>
    );
};

export default UserCard;

const StatCard = ({ label, count, status }) => {
    return (
        <div className={`rounded-xl border px-2.5 py-2.5 ${getStatusBadgeClasses(status)}`}>
            <p className="text-lg font-bold leading-none">{count}</p>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-wide opacity-80">{label}</p>
        </div>
    );
};
