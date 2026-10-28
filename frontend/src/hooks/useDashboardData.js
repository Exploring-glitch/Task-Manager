import { useEffect, useState } from "react";
import toast from "react-hot-toast";

/**
 * Loads dashboard data once. `fetchDashboard` must be a stable reference
 * (a module level import), otherwise the request runs on every render.
 */
export const useDashboardData = (fetchDashboard) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isActive = true;

        const load = async () => {
            try {
                const response = await fetchDashboard();
                if (isActive) setData(response);
            } catch (error) {
                toast.error(error.message || "Could not load your dashboard");
            } finally {
                if (isActive) setLoading(false);
            }
        };

        load();

        return () => {
            isActive = false;
        };
    }, [fetchDashboard]);

    return { data, loading };
};
