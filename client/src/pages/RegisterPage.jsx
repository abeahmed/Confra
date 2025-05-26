import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import InputField from '../components/InputField';
import Button from '../components/Button';
import AuthCard from '../components/AuthCard';
import Alert from '../components/Alert';
import Text from '../components/Text';
import LinkButton from '../components/LinkButton';

function RegisterPage() {
    const { register, error, loading, isAuthenticated, clearError } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        role: 'organizer'
    });

    useEffect(() => {
        clearError();
        if (isAuthenticated == true) {
            navigate('/dashboard', { replace: true });
        }
    }, [isAuthenticated, navigate, clearError]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
        clearError();
    };

    const validateForm = () => {
        return formData.name && 
               formData.email && 
               formData.password && 
               formData.confirmPassword;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const success = await register(formData);

        if (success) {
            navigate('/');
        }
        
    };

    return ( 
        <AuthCard title="Create an organizer account" onSubmit={handleSubmit}>
            <InputField name="Full Name" id="name" type="text" value={formData.name} onChange={handleChange} required/>
            <InputField name="Email" id="email" type="email" value={formData.email} onChange={handleChange} required/>
            <InputField name="Password" id="password" type="password" value={formData.password} onChange={handleChange} required/>
            <InputField name="Confirm Password" id="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required/>
            <InputField name="Phone Number" id="phone" type="tel" value={formData.phone} onChange={handleChange} required/>
            <Button type="submit" disabled={!validateForm()} loading={loading}>Register</Button>
            

            {error && <Alert type="error">{error}</Alert>}

            <Text variant = "bodySmall">Already have an account? <LinkButton to="/login">Login</LinkButton></Text>

        </AuthCard>
    );
 
    
}

export default RegisterPage;