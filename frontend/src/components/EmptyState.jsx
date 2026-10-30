import { LuInbox } from "react-icons/lu";

const EmptyState = ({ title = "Nothing here yet", description, action, icon: Icon = LuInbox }) => {
    return (
        <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-14 text-center">
            <span className="icon-tile h-14 w-14 rounded-2xl bg-primary-soft text-primary ring-1 ring-primary/10">
                <Icon className="text-2xl" aria-hidden="true" />
            </span>

            <p className="mt-4 text-sm font-semibold text-slate-800">{title}</p>

            {description && <p className="mt-1.5 max-w-sm text-xs leading-5 text-slate-500">{description}</p>}

            {action && <div className="mt-5">{action}</div>}
        </div>
    );
};

export default EmptyState;
