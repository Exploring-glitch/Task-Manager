import React, { createContext, useState, useEffect, Children } from "react";
import { axiosInstance } from "../util/axiosInstance.js";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axiosInstance.get("/api/auth/profile");
                setUser(res.data);
            } catch(err) {
                console.error("Profile fetch failed:", err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const updateUser = (userData) => {
        setUser(userData)
    };

    const clearUser = () => {
        setUser(null)
    };


    return (
        <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
}
