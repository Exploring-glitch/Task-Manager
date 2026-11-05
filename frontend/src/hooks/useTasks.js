import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { get_all_tasks } from "../api/tasksApi.js";

const EMPTY_SUMMARY = { all: 0, pending: 0, inProgress: 0, completed: 0 };

export const useTasks = (status) => {
    const [tasks, setTasks] = useState([]);
    const [statusSummary, setStatusSummary] = useState(EMPTY_SUMMARY);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isActive = true;

        const load = async () => {
            setLoading(true);

            try {
                const response = await get_all_tasks({
                    status: status === "All" ? undefined : status,
                });

                if (!isActive) return;

                setTasks(response?.tasks || []);
                setStatusSummary(response?.statusSummary || EMPTY_SUMMARY);
            } catch (error) {
                if (isActive) {
                    // Do not leave tasks from the previous filter on screen when
                    // the new request fails.
                    setTasks([]);
                    toast.error(error.message || "Could not load tasks");
                }
            } finally {
                if (isActive) setLoading(false);
            }
        };

        load();

        return () => {
            isActive = false;
        };
    }, [status]);

    return { tasks, statusSummary, loading };
};
