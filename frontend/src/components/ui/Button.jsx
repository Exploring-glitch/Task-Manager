import { LuLoaderCircle } from "react-icons/lu";

const VARIANT_CLASSES = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
    danger: "btn-danger",
    success: "btn-success",
};

const SIZE_CLASSES = {
    sm: "btn-sm",
    md: "",
    lg: "btn-lg",
};

const Button = ({
    children,
    variant = "primary",
    size = "md",
    icon: Icon,
    iconRight: IconRight,
    loading = false,
    className = "",
    type = "button",
    disabled = false,
    ...props
}) => {
    return (
        <button
            type={type}
            disabled={disabled || loading}
            className={`btn ${VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary} ${SIZE_CLASSES[size] || ""} ${className}`}
            {...props}
        >
            {loading ? (
                <LuLoaderCircle className="animate-spin text-base" aria-hidden="true" />
            ) : (
                Icon && <Icon className="text-base" aria-hidden="true" />
            )}

            <span>{children}</span>

            {IconRight && !loading && <IconRight className="text-base" aria-hidden="true" />}
        </button>
    );
};

export default Button;
