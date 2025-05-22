import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Button from '../components/Button';
import { createEvent } from '../api/eventservice';
import PageContainer from '../components/PageContainer';
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
                setCreatedEventId(response.data.data._id);
            } else {
                setError(response.data.error || 'Failed to create event');
            }
        
        } catch (err) {
            console.error('Error creating event:', err);
            setError(err.message || 'An error occurred while creating the event');
        } finally {
            setLoading(false);
        }
            
    };

    if (createdEventId) {
        const eventUrl = `${window.location.origin}/event/${createdEventId}`;
        return (
            <PageContainer>
               <StatusMessage
                alertType="success"
                alertMessage="Event created successfully!"
                description="Share this link with your attendees:"
                >
                    <div className="bg-zinc-950 p-4 rounded-lg mb-6 w-full max-w-md border border-zinc-800">
                        <code className="text-gray-300 break-all">{eventUrl}</code>
                    </div>
                    <div className="flex gap-4">
                        <Button onClick={() => navigator.clipboard.writeText(eventUrl)}>Copy link</Button>
                        <Button onClick={() => navigate(`/event/${createdEventId}`)}>View Event</Button>
                    </div>
                </StatusMessage>
            </PageContainer>
        );
    } 

    return (
        <PageContainer>
            <EventForm
                onSubmit={handleSubmit}
                loading={loading}
                error={error}
                submitText="Create"
                title="Create New Event"
            />
        </PageContainer>
     
    );

}


export default CreateEventPage;