import { LuUserRound } from "react-icons/lu";

const AvatarGroup = ({ avatars = [], maxVisible = 3 }) => {
    const visibleAvatars = avatars.filter(Boolean);
    const hiddenCount = visibleAvatars.length - maxVisible;

    if (visibleAvatars.length === 0) {
        return (
            <div
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-slate-400"
                title="Unassigned"
            >
                <LuUserRound className="text-base" aria-hidden="true" />
            </div>
        );
    }

    return (
        <div className="flex items-center">
            {visibleAvatars.slice(0, maxVisible).map((avatar, index) => (
                <img
                    key={`${avatar}-${index}`}
                    src={avatar}
                    alt={`Assigned member ${index + 1}`}
                    className="-ml-3 h-9 w-9 rounded-full border-2 border-white object-cover first:ml-0"
                />
            ))}

            {hiddenCount > 0 && (
                <div className="-ml-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-blue-50 pr-1 text-sm font-medium">
                    +{hiddenCount}
                </div>
            )}
        </div>
    );
};

export default AvatarGroup;
