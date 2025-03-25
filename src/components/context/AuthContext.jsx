import axios from "axios";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import React from 'react'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


export const AuthContext = createContext()
function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [role, setRole] = useState(localStorage.getItem("role") || null);

    const fetchProfile = async (currentToken) => {
        try {
            const res = await axios.get("http://localhost:7890/user/profile", {
                headers: { Authorization: `Bearer ${currentToken}` },
            });
            setUser(res.data.user);
            setRole("user");
            localStorage.setItem("role", "user");
        } catch (error) {
            try {
                const res = await axios.get("http://localhost:7890/admin/profile", {
                    headers: { Authorization: `Bearer ${currentToken}` },
                });
                // console.log("auth res",res);
                if (res.data.admin) {
                    setUser(res.data.admin);
                    setRole("admin");
                    localStorage.setItem("role", "admin");
                  }
            } catch (error) {
                console.error("Error fetching profile:", error);
                // logout();
            }
        }
    };

    const login = (token) => {
        console.log("auth token is" ,token);
        setToken(token);
        localStorage.setItem("token", token);
        fetchProfile(token);
    };

    const logout = (navigate) => {
        setToken(null);
        setUser(null);
        setRole(null);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        console.log("Log out success");
        if (navigate) {
            navigate("/login");
            toast.error("Logout Success")
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            fetchProfile(storedToken);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, login, role, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider