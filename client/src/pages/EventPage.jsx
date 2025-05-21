import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEvent } from '../api/eventservice';
import { useAuth } from '../contexts/AuthContext';
import { LuCopy, LuTrash2, LuSquarePen } from "react-icons/lu";
import Text from '../components/Text';
import Button from '../components/Button';
import PageContainer from '../components/PageContainer';
import StatusMessage from '../components/StatusMessage';
import Loading from '../components/Loading';

function EventPage() {
    const { id } = useParams();
    const { user } = useAuth();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOrganizer, setIsOrganizer] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await getEvent(id);
               
                setEvent(response.data.data);   
                
                setIsOrganizer(user && response.data.data.organizer._id === user.id);
               
            } catch (err) {
                setError(err.response?.data?.error || 'An error occurred while fetching the event');
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id, user]);

    const renderActions = () => {
        if (isOrganizer) {
            return (
                <div className="flex flex-col items-cetnter gap-4">
               
                    <div className="flex justify-center items-center gap-4">
                        <Button><LuSquarePen /></Button>
                        <Button><LuTrash2 /></Button>
                    </div>

                </div>
            )
        } else {
            return (
            <div className="flex justify-center items-center">
            <Button>RSVP Now</Button>
            </div>
            )
        }
    }
    
    if (loading) {
        return (
            <PageContainer>
                <Loading message="Loading Event" />
            </PageContainer>
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
            <code>Link: {window.location.href}</code>
        </div>
        {renderActions()}
    </PageContainer>
    );
}

export default EventPage;
    