import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import InputField from '../components/InputField';
import Button from '../components/Button';
import AuthCard from '../components/AuthCard';
import Text from '../components/Text';
import Alert from '../components/Alert';
import VerificationCode from '../components/VerificationCode';
import LinkButton from '../components/LinkButton';

function LoginPage() {
    const { login, forgotPassword, verifyCode, resetPassword, error, loading, isAuthenticated, clearError } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [isEmailSubmitted, setIsEmailSubmitted] = useState(false)
    const [isVerified, setIsVerified] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const from = location.state?.from || '/dashboard';

    const state = useLocation();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
        if (isForgotPassword) {
            return formData.email;
        }
        return formData.email && formData.password;
    };

    const handleBack = () => {
        setIsForgotPassword(!isForgotPassword);
        setIsEmailSubmitted(false);
        setIsVerified(false);
        setNewPassword('');
        setConfirmPassword('');
    }


    const handleVerification = async (code) => {
        const success = await verifyCode(code);
        if (success) {
            setIsVerified(true);
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        const success = await resetPassword(newPassword);
        if (success) {
            setIsForgotPassword(false);
            setIsEmailSubmitted(false);
            setIsVerified(false);
            setNewPassword('');
            setConfirmPassword('');
            navigate('/login', { 
                state: { 
                    successMessage: 'Password reset successful.' 
                },
                replace: true
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isVerified) {
            await handlePasswordReset(e);
            return;
        }

        if (isForgotPassword) {
            const success = await forgotPassword(formData.email);
            if (success) {
                setIsEmailSubmitted(true);  
            }
            return;
        }

        if (!formData.email || !formData.password) {
            return;
        }

        const success = await login(formData.email, formData.password);

        if (success) {
            navigate(from, { replace: true });
        }
        
    };

    return ( 
        
        <AuthCard title={isForgotPassword ? "Reset Password" : "Login to your account"} onSubmit={handleSubmit}>

            
        {!isEmailSubmitted && (
            <InputField name="email" id="email" type="email" value={formData.email} 
            onChange={handleChange} required/>
        )}

            {!isForgotPassword ? ( 
                <InputField name="password" id="password" type="password" value={formData.password} 
                onChange={handleChange} required/>
            ) : isEmailSubmitted ? (
                <>
                {!isVerified ? ( 
                    <VerificationCode
                        onVerify={handleVerification}
                    />
                ) : (
                    <>
                        <InputField name="New Password" id="newPassword" type="password" 
                        value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required/>
                        <InputField name="Confirm Password" id="confirmPassword" type="password" 
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                        <Button 
                            type="submit" 
                            disabled={!newPassword || !confirmPassword}
                            loading={loading}
                        >
                        Reset
                        </Button>
                    </>
                )}
                </>
            ) : null}

            {!isEmailSubmitted && (
                <Button type="submit" disabled={!validateForm()} loading={loading}>
                    {isForgotPassword ? "Submit" : "Login"}
                </Button>
            )}

            {error && <Alert type="error">{error}</Alert>}
            
            <LinkButton onClick={handleBack}>
                {isForgotPassword ? "Back to Login" : "Forgot Password?"}
            </LinkButton>
            <Text variant = "bodySmall">
                Don't have an account? <LinkButton to="/register">Register</LinkButton>
            </Text> 
        </AuthCard>
       
    );
 
    
}

export default LoginPage;