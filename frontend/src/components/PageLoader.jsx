const PageLoader = ({ label = "Loading..." }) => {
    return (
        <div className="flex min-h-[40vh] items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-gray-500">
                <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-primary"
                    aria-hidden="true"
                />
                {label}
            </div>
        </div>
    );
};

export default PageLoader;
