const EmptyState = ({ title = "Nothing here yet", description, action }) => {
    return (
        <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
            <p className="text-sm font-medium text-gray-700">{title}</p>

            {description && <p className="mt-1 text-xs text-gray-500">{description}</p>}

            {action && <div className="mt-4">{action}</div>}
        </div>
    );
};

export default EmptyState;
