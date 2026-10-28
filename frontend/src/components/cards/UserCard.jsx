import { getStatusBadgeClasses } from "../../util/taskMeta.js";

const UserCard = ({ userInfo }) => {
    return (
        <div className="rounded-xl border-2 border-gray-200/50 bg-white p-4 shadow-md shadow-gray-100">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src={userInfo?.profileImageUrl || ""}
                        alt={`${userInfo?.name || "Member"} avatar`}
                        className="h-12 w-12 rounded-full border-2 border-white bg-slate-200 object-cover"
                    />

                    <div>
                        <p className="text-sm font-medium">{userInfo?.name}</p>
                        <p className="text-xs text-gray-500">{userInfo?.email}</p>
                    </div>
                </div>
            </div>

            <div className="mt-5 flex items-end gap-3">
                <StatCard label="Pending" count={userInfo?.pendingTask || 0} status="Pending" />
                <StatCard label="In Progress" count={userInfo?.inProgressTask || 0} status="In Progress" />
                <StatCard label="Completed" count={userInfo?.completedTask || 0} status="Completed" />
            </div>
        </div>
    );
};

export default UserCard;

const StatCard = ({ label, count, status }) => {
    return (
        <div className={`flex-1 rounded border px-2 py-1 text-[10px] font-medium ${getStatusBadgeClasses(status)}`}>
            <span className="text-[12px] font-semibold">{count}</span>
            <br />
            {label}
        </div>
    );
};
