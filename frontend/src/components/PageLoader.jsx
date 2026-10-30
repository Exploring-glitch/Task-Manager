const PageLoader = ({ label = "Loading..." }) => {
    return (
        <div
            className="flex min-h-[40vh] flex-col items-center justify-center gap-4"
            role="status"
            aria-live="polite"
        >
            <span className="relative inline-flex h-11 w-11 items-center justify-center">
                <span
                    className="absolute inset-0 animate-spin rounded-full border-[3px] border-slate-200 border-t-primary"
                    aria-hidden="true"
                />
                <span className="h-4 w-4 rounded-full bg-primary-soft" aria-hidden="true" />
            </span>

            <span className="text-sm font-medium text-slate-500">{label}</span>
        </div>
    );
};

export default PageLoader;
