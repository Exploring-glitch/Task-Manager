import Avatar from "./ui/Avatar.jsx";

const AvatarGroup = ({ avatars = [], maxVisible = 3 }) => {
    const visibleAvatars = avatars.filter(Boolean);
    const hiddenCount = visibleAvatars.length - maxVisible;

    if (visibleAvatars.length === 0) {
        return (
            <span title="Unassigned">
                <Avatar size="md" ring />
            </span>
        );
    }

    return (
        <div className="flex items-center -space-x-2">
            {visibleAvatars.slice(0, maxVisible).map((avatar, index) => (
                <Avatar key={`${avatar}-${index}`} src={avatar} size="md" ring />
            ))}

            {hiddenCount > 0 && (
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600 ring-2 ring-white">
                    +{hiddenCount}
                </span>
            )}
        </div>
    );
};

export default AvatarGroup;
