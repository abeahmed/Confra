import { useState } from 'react';
import InputField from './InputField';
import Button from './Button';
import StatusMessage from './StatusMessage';
import Spinner from './Spinner';
import ContentCard from './ContentCard';
import AuthCard from './AuthCard';
import { rsvpToEvent } from '../api/rsvpservice';

const RSVPForm = ({ eventId, bookingSuccess }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
    
        try {
            console.log('Submitting with eventId:', eventId);
            const response = await rsvpToEvent(eventId, { name, email });
            setName('');
            setEmail('');
            setSuccess('Sign up complete! Check your inbox for event details');
            if (bookingSuccess) {
                bookingSuccess(response);
            }
        } catch (error) {
            setError(error.message || 'Could not sign you up. Please check your email and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
            <InputField type="name" name="Full Name" value={name} 
            onChange={(e) => setName(e.target.value)} required />
            <InputField type="email" name="Email" value={email} 
            onChange={(e) => setEmail(e.target.value)} required />
            
            <Button variant="nav" type="submit" disabled={loading} className="mb-6">
                {loading ? <Spinner /> : 'Submit'}
            </Button>
            {error && <StatusMessage alertType="error" alertMessage={error} />}
            {success && <StatusMessage alertType="success" alertMessage={success} />}
        </form>
    );
    
};

export default RSVPForm;