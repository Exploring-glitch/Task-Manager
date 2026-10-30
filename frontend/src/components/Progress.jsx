import { getProgressBarClass } from "../util/taskMeta.js";

const Progress = ({ progress = 0, status }) => {
    const clampedProgress = Math.min(100, Math.max(0, Number(progress) || 0));

    return (
        <div
            className="h-2 w-full overflow-hidden rounded-full bg-slate-100"
            role="progressbar"
            aria-valuenow={clampedProgress}
            aria-valuemin={0}
            aria-valuemax={100}
        >
            <div
                className={`h-full rounded-full transition-[width] duration-500 ease-out ${getProgressBarClass(status)}`}
                style={{ width: `${clampedProgress}%` }}
            />
        </div>
    );
};

export default Progress;
