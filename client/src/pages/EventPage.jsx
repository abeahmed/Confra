import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEvent, deleteEvent} from '../api/eventservice';
import { useAuth } from '../contexts/AuthContext';
import { LuCopy, LuTrash2, LuSquarePen } from "react-icons/lu";
import Text from '../components/Text';
import Button from '../components/Button';
import PageContainer from '../components/PageContainer';
import StatusMessage from '../components/StatusMessage';
import Loading from '../components/Loading';
import RSVPForm from '../components/RSVPForm';
import ContentCard from '../components/ContentCard';

function EventPage() {
    const { id } = useParams();
    const { user } = useAuth();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOrganizer, setIsOrganizer] = useState(false);
    const [showRSVP, setShowRSVP] = useState(false);

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

    const handleRSVP = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await bookEvent(id, email);
            setSuccess('Booking successful!');
        } catch (error) {
            setError(error.message || 'An error occurred while signing up');
        } finally {
            setLoading(false);
        }
    }

    const handleBookingSuccess = (response) => {
        setShowRSVP(false); // Hide the form after successful booking
        // You can also show a success message or refresh event data if needed
    };

    const handleDelete = async () => {
        try {
            await deleteEvent(id);
            navigate('/dashboard');
        } catch (error) {
            setError(error.message || 'An error occurred while deleting the event');
        }
    }
    

    const renderActions = () => {
        if (isOrganizer) {
            return (
                <div className="flex flex-col">
                     <StatusMessage alertType="info" alertMessage={window.location.href} className="w-full"></StatusMessage>
               
                    <div className="flex text-center justify-center items-center gap-4 flex-wrap">
                        <Button variant="secondary" icon={LuSquarePen} 
                        onClick={() => navigate(`/event/${event.id}/edit`, { state: { event } })} >Edit</Button>
                        <Button variant="secondary" icon={LuTrash2} onClick={handleDelete}>Delete</Button>    
                    </div>

                </div>
            )
        } else {
            return (
                <div className="flex justify-center items-center">
                        {showRSVP && (
                        <ContentCard maxWidth="max-w-md">
                            <RSVPForm eventId={id} bookingSuccess={handleBookingSuccess} />
                        </ContentCard>
                        )}
                
                    {!showRSVP && (
                    <Button onClick={() => setShowRSVP(true)}>
                        Sign Up for Event
                    </Button>
                    )}
              </div>
            )
        }
    }
    
    /*if (loading) {
        return (
            <PageContainer>
                <Loading message="Loading" />
            </PageContainer>
        )
    }*/


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
        {renderActions()}
    </PageContainer>
    );
}

export default EventPage;
    