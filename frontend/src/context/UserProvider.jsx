import { useCallback, useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../util/axiosInstance.js";
import { UserContext } from "./UserContext.js";

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isActive = true;

        const fetchUser = async () => {
            try {
                const { data } = await axiosInstance.get("/api/auth/profile");
                if (isActive) setUser(data?.user || null);
            } catch {
                // Not signed in: the interceptor already reported the details.
                if (isActive) setUser(null);
            } finally {
                if (isActive) setLoading(false);
            }
        };

        fetchUser();

        return () => {
            isActive = false;
        };
    }, []);

    const updateUser = useCallback((userData) => {
        setUser(userData || null);
    }, []);

    const clearUser = useCallback(() => {
        setUser(null);
    }, []);

    const value = useMemo(
        () => ({ user, loading, updateUser, clearUser }),
        [user, loading, updateUser, clearUser]
    );

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
