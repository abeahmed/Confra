import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const respone = await api.post('users/login', { email, password });

            const data = response.data;

            if (!data.success) {
                throw new Error(data.error || 'Login failed');
            }

            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

            setToken(data.token);
            setUser(data.user);
            return true;

        } catch (err) {
            setError(err.response?.data?.error || err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('users/register', userData);
            const data = response.data;

            if (!data.success) {
                throw new Error(data.error || 'Registration failed');
            }

            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            
            setToken(data.token);
            setUser(data.user);
            return true;

        } catch (err) {
            setError(err.response?.data?.error || err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        delete api.defaults.headers.common['Authorization'];
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                error,
                login,
                register,
                logout,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);
