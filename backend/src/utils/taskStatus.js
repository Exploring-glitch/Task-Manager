/**
 * Applies an explicit status change while keeping checklist progress in sync.
 * Marking a task completed ticks every item; reopening it clears that automatic
 * completion so a non-completed task never reports 100% progress.
 */
export const applyTaskStatus = (task, status) => {
    const wasCompleted = task.status === "Completed";

    task.status = status;

    if (status === "Completed") {
        task.setChecklistCompletion(true);
    } else if (wasCompleted) {
        task.setChecklistCompletion(false);
        // The reset recalculates the derived status; keep the requested one.
        task.status = status;
    } else {
        task.recalculateProgress();
    }

    return task;
};
