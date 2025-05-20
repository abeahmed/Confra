import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import InputField from '../components/InputField';
import Button from '../components/Button';
import AuthCard from '../components/AuthCard';
import Text from '../components/Text';
import Alert from '../components/Alert';

function LoginPage() {
    const { login, error, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || '/dashboard';

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            return;
        }

        const success = await login(formData.email, formData.password);

        if (success) {
            navigate(from, { replace: true });
        }
        
    };

    return ( 
        
        <AuthCard title="Login to your account" onSubmit={handleSubmit}>
            <InputField name="email" id="email" type="email" value={formData.email} onChange={handleChange} required/>
            <InputField name="password" id="password" type="password" value={formData.password} onChange={handleChange} required/>
            <Button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
            
            {error && <Alert type="error">{error}</Alert>}
            
            <Text variant = "bodySmall">Don't have an account? <Link to="/register">Register</Link></Text>
        </AuthCard>
       
    );
 
    
}

export default LoginPage;