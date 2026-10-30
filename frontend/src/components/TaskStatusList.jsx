const TaskStatusList = ({ tabs, activeTab, setActiveTab }) => {
    return (
        <div
            className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-line bg-white p-1 shadow-sm"
            role="tablist"
            aria-label="Filter tasks by status"
        >
            {tabs.map((tab) => {
                const isActive = activeTab === tab.label;

                return (
                    <button
                        key={tab.label}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveTab(tab.label)}
                        className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                            isActive
                                ? "bg-primary text-white shadow-sm shadow-primary/25"
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                        }`}
                    >
                        {tab.label}

                        <span
                            className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${
                                isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                            }`}
                        >
                            {tab.count}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

export default TaskStatusList;
