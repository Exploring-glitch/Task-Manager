import { getProgressBarClass } from "../util/taskMeta.js";

const Progress = ({ progress = 0, status }) => {
    const clampedProgress = Math.min(100, Math.max(0, Number(progress) || 0));

    return (
        <div
            className="h-1.5 w-full rounded-full bg-gray-200"
            role="progressbar"
            aria-valuenow={clampedProgress}
            aria-valuemin={0}
            aria-valuemax={100}
        >
            <div
                className={`h-1.5 rounded-full ${getProgressBarClass(status)}`}
                style={{ width: `${clampedProgress}%` }}
            />
        </div>
    );
};

export default Progress;
