import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Button from '../components/Button';
import { createEvent } from '../api/eventservice';
import EventForm from '../components/EventForm';
import StatusMessage from '../components/StatusMessage';

function CreateEventPage() {
    const [loading, setLoading] = useState(false);
    const [createdEventId, setCreatedEventId] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (eventData) => {
        setLoading(true);
        try {
            const response = await createEvent(eventData);
            if (response.data.success) {
                const eventId = response.data.data._id;
                const eventUrl = `${window.location.origin}/event/${eventId}`;

                navigator.clipboard.writeText(eventUrl);
                
                navigate(`/event/${eventId}`, {
                    state: { 
                        successMessage: 'Event created successfully! Link copied to clipboard' 
                    }
                });
            }
        } catch (err) {
            if (err.response?.status === 400) {
                const errorMessage = err.response.data.errors?.[0]?.message || 
                err.response.data.error || 'Please check event details';
                setError(errorMessage);
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
            
    };

    return (
            <EventForm
                onSubmit={handleSubmit}
                loading={loading}
                error={error}
                submitText="Create"
                title="Create New Event"
            />
    );

}


export default CreateEventPage;