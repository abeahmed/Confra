import { useState } from 'react';
import InputField from './InputField';
import Button from './Button';
import StatusMessage from './StatusMessage';
import Spinner from './Spinner';
import ContentCard from './ContentCard';
import AuthCard from './AuthCard';
import { initiateVerification, createRSVP } from '../api/rsvpservice';
import VerificationCode from './VerificationCode';

const RSVPForm = ({ eventId, bookingSuccess }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [showVerification, setShowVerification] = useState(false);
    const [rsvpId, setRsvpId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
    
        try {
            await initiateVerification(eventId, { name, email });
            setShowVerification(true);

        } catch (error) {
            setError(error.response?.data?.error ||  'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerification = async (code) => {
        setLoading(true);
        try {
            const response = await createRSVP(eventId, { code });
            if (response.data.success) {
                setSuccess('Sign up complete! Check your inbox for event details');
                setName('');
                setEmail('');
                setShowVerification(false);
            if (bookingSuccess) {
                bookingSuccess();
            }
            }
        } catch (error) {
            setError(error.response?.data?.error || 'Unable to verify code.');
        } finally {
            setLoading(false);
        }
    };

    if (showVerification) {
        return <VerificationCode 
            onVerify={handleVerification} 
            error={error}
        />;
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
            <InputField type="name" name="Full Name" value={name} 
            onChange={(e) => setName(e.target.value)} required />
            <InputField type="email" name="Email" value={email} 
            onChange={(e) => setEmail(e.target.value)} required />
            <Button type="submit" disabled={loading}>
                Submit
            </Button>
            {error && <StatusMessage alertType="error" alertMessage={error} />}
            {/*{success && <StatusMessage alertType="success" alertMessage={success} />} */}
        </form>
    );
    
};

export default RSVPForm;