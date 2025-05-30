import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getEvent, deleteEvent} from '../api/eventservice';
import { useAuth } from '../contexts/AuthContext';
import { LuTrash2, LuSquarePen, LuCopy } from "react-icons/lu";
import Text from '../components/Text';
import Button from '../components/Button';
import StatusMessage from '../components/StatusMessage';
import Loading from '../components/Loading';
import RSVPForm from '../components/RSVPForm';
import ContentCard from '../components/ContentCard';
import Alert from '../components/Alert';

function EventPage() {
    const { id } = useParams();
    const { user } = useAuth();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOrganizer, setIsOrganizer] = useState(false);
    const [showRSVP, setShowRSVP] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const navigate = useNavigate();

    const state = useLocation();

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

    const handleBookingSuccess = (response) => {
        setShowSuccess(true);
    };

    const handleDelete = async () => {
        try {
            await deleteEvent(id);
            navigate('/dashboard', {
                state: { 
                    successMessage: 'Event deleted successfully' 
                }
            });
            
        } catch (error) {
            setError(error.message || 'Failed to delete event');
        }
    }

    const renderAttendeeStats = () => {
        if (!isOrganizer) return null;

        return (
            <div className="bg-zinc-950 rounded-lg p-6 mb-8">
                <div className="flex justify-between items-center">
                    <div>
                        <Text variant="h3" className="mb-2">Attendees</Text>
                        <Text variant="bodyLarge" className="text-rose-500">
                            {event.attendeeCount} / {event.capacity}
                        </Text>
                    </div>
                    <div className="text-gray-400">
                        <Text variant="body">
                            {((event.attendeeCount / event.capacity) * 100).toFixed(0)}% capacity
                        </Text>
                    </div>
                </div>
            </div>
        );
    };
    

    const renderActions = () => {
        if (isOrganizer) {
            return (
                <div className="flex flex-col"> 
                    <div className="flex text-center justify-center items-center gap-4 flex-wrap">
                        <Button variant="secondary" icon={LuCopy} onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                navigate(location.pathname, { 
                                    state: { 
                                        successMessage: 'Event link copied to clipboard' 
                                    },
                                    replace: true
                                });
                            }}
                        > Copy Link </Button>
                        <Button variant="secondary" icon={LuSquarePen} 
                        onClick={() => navigate(`/event/${event.id}/edit`, { state: { event } })} >Edit</Button>
                        <Button variant="secondary" icon={LuTrash2} onClick={handleDelete}>Delete</Button> 
                        
                    </div>

                </div>
            )
        } else {
            return (
                <div className="flex justify-center items-center">
                    {showSuccess ? (
                        <StatusMessage alertType="success" alertMessage="Sign up complete! Check your inbox for event details" />
                    ) : showRSVP ? (
                        <ContentCard maxWidth="max-w-md">
                            <RSVPForm eventId={id} bookingSuccess={handleBookingSuccess} />
                        </ContentCard>
                    ) : (
                        <Button onClick={() => setShowRSVP(true)}>
                            Sign Up for Event
                        </Button>
                    )}
              </div>
            )
        }
    }
    
    if (loading) {
        return (
            <Loading message="Loading Event" />
        )
    }


    if (!event || error) {
        return (

            <StatusMessage alertType="error" alertMessage="Event not found" 
            description="Please check the URL or try again later.">
                <Button onClick={() => navigate('/')}>Back to home</Button>
            </StatusMessage>

        );
    }

    return (
        <div>
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
            
        <div className="bg-zinc-800/30 rounded-lg p-6 mb-8">
            <Text variant="h3">Description</Text>
            <Text variant="body">{event.description}</Text>
        </div>
        {renderAttendeeStats()}
        {renderActions()}
    </div>
    );
}

export default EventPage;
    