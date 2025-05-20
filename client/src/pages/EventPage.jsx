import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEvent } from '../api/eventservice';
import Text from '../components/Text';
import Button from '../components/Button';
import PageContainer from '../components/PageContainer';
import StatusMessage from '../components/StatusMessage';

function EventPage() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await getEvent(id);
                console.log('Full response:', response);
                console.log('Response data:', response.data);
                console.log('Response data.data:', response.data.data); 
               
                setEvent(response.data.data);    
               
            } catch (err) {
                setError(err.response?.data?.error || 'An error occurred while fetching the event');
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    console.log('Event object:', event);
    
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }


    if (!event || error) {
        return (
            <PageContainer>
                <StatusMessage alertType="error" alertMessage="Event not found" 
                description="Please check the URL or try again later.">
                    <Button onClick={() => navigate('/')}>Back to home</Button>
                </StatusMessage>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <Text variant="h1">{event.title}</Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                    <Text variant="h3">Date and Time:</Text>
                    <Text variant="body">
                        {new Date(event.startTime).toLocaleString()} - {new Date(event.endTime).toLocaleString()}
                    </Text>
                </div>
                <div>
                    <Text variant="h3">Venue:</Text>
                    <Text variant="body">{event.venue}</Text>
                </div>
                <div>
                    <Text variant="h3">Category:</Text>
                    <Text variant="body">{event.category}</Text>
                </div>
                <div>
                    <Text variant="h3">Address:</Text>
                    <Text variant="body">{event.address}</Text>
                </div>
            </div>
        <div className="bg-zinc-950 rounded-lg p-6 mb-8">
            <Text variant="h3">Description</Text>
            <Text variant="body">{event.description}</Text>
        </div>
        <div className="flex justify-center items-center">
            <Button>RSVP Now</Button>
        </div>
       
    </PageContainer>
    );
}

export default EventPage;
    