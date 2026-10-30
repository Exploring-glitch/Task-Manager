const PageHeader = ({ eyebrow, title, description, actions, icon: Icon }) => {
    return (
        <div className="flex flex-col gap-4 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-start gap-4">
                {Icon && (
                    <span className="icon-tile hidden h-12 w-12 rounded-2xl bg-primary-soft text-primary ring-1 ring-primary/10 sm:inline-flex">
                        <Icon className="text-2xl" aria-hidden="true" />
                    </span>
                )}

                <div>
                    {eyebrow && <p className="page-eyebrow">{eyebrow}</p>}
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-[28px]">{title}</h1>

                    {description && (
                        <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">{description}</p>
                    )}
                </div>
            </div>

            {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </div>
    );
};

export default PageHeader;
