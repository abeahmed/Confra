import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        const savedToken = sessionStorage.getItem('auth_token');
        return savedToken || null;
    });
    const [user, setUser] = useState(() => {
        const savedUser = sessionStorage.getItem('auth_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const clearError = useCallback(() => {
        setError('');
    }, []);

    useEffect(() => {
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete api.defaults.headers.common['Authorization'];
        }
    }, [token]);
    

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('users/login', { email, password });

            const data = response.data;

            if (!data.success) {
                throw new Error(data.error || 'Login failed');
            }

            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

            setToken(data.token);
            setUser(data.user);

            sessionStorage.setItem('auth_token', data.token);
            sessionStorage.setItem('auth_user', JSON.stringify(data.user));
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

        sessionStorage.removeItem('auth_token');
        sessionStorage.removeItem('auth_user'); 
    };

    const forgotPassword = async (email) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('users/forgot-password', { email });
            const data = response.data;

            if (!data.success) {
                throw new Error(data.error || 'Failed to send verification code');
            }

            return true;
        } catch (err) {
            setError(err.response?.data?.error || err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const verifyCode = async (code) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('users/verify-code', { code });
            const data = response.data;

            if (!data.success) {
                throw new Error(data.error || 'Invalid verification code');
            }

            return true;
        } catch (err) {
            setError(err.response?.data?.error || err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (newPassword) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('users/reset-password', { newPassword });
            const data = response.data;

            if (!data.success) {
                throw new Error(data.error || 'Failed to reset password');
            }

            return true;
        } catch (err) {
            setError(err.response?.data?.error || err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                error,
                clearError,
                login,
                register,
                logout,
                forgotPassword,
                verifyCode,
                resetPassword,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);
