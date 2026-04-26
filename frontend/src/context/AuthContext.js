'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const API_URL = 'http://localhost:5001/api/auth';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is already logged in on mount (via cookie)
    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {
        try {
            const res = await fetch(`${API_URL}/me`, {
                credentials: 'include'
            });
            const data = await res.json();

            if (data.success) {
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!data.success) {
            throw new Error(data.message || 'Login failed');
        }

        setUser(data.user);
        return data;
    };

    const signup = async (name, email, password) => {
        const res = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();

        if (!data.success) {
            throw new Error(data.message || 'Signup failed');
        }

        setUser(data.user);
        return data;
    };

    const logout = async () => {
        try {
            await fetch(`${API_URL}/logout`, {
                credentials: 'include'
            });
        } catch {
            // Logout even if the request fails
        }
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
