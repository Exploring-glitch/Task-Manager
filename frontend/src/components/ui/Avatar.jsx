import { useEffect, useState } from "react";
import { LuUserRound } from "react-icons/lu";

const SIZE_CLASSES = {
    xs: "h-6 w-6 text-[10px]",
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-20 w-20 text-2xl",
};

const getInitials = (name = "") => {
    const parts = name.trim().split(/\s+/).filter(Boolean);

    if (parts.length === 0) return "";

    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";

    return `${first}${last}`.toUpperCase();
};

const Avatar = ({ src, name = "", size = "md", className = "", ring = false }) => {
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        setFailed(false);
    }, [src]);

    const showImage = Boolean(src) && !failed;
    const initials = getInitials(name);

    return (
        <span
            className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-indigo-100 via-white to-sky-100 font-semibold text-primary ${SIZE_CLASSES[size] || SIZE_CLASSES.md} ${ring ? "ring-2 ring-white" : ""} ${className}`}
        >
            {showImage ? (
                <img
                    src={src}
                    alt={name ? `${name} profile` : "Profile image"}
                    className="h-full w-full object-cover"
                    onError={() => setFailed(true)}
                />
            ) : initials ? (
                <span aria-hidden="true">{initials}</span>
            ) : (
                <LuUserRound className="h-1/2 w-1/2 opacity-60" aria-hidden="true" />
            )}
        </span>
    );
};

export default Avatar;
