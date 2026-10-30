const SectionCard = ({ title, description, actions, children, className = "", bodyClassName = "" }) => {
    const hasHeader = Boolean(title || description || actions);

    return (
        <section className={`surface-card overflow-hidden ${className}`}>
            {hasHeader && (
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line/80 px-5 py-4 sm:px-6">
                    <div>
                        {title && <h2 className="text-base font-semibold text-ink">{title}</h2>}
                        {description && <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>}
                    </div>

                    {actions && <div className="flex items-center gap-2">{actions}</div>}
                </div>
            )}

            <div className={`px-5 py-5 sm:px-6 ${bodyClassName}`}>{children}</div>
        </section>
    );
};

export default SectionCard;
