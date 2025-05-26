import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Text from '../components/Text';
import Button from '../components/Button';
import { LuCopy, LuSquarePen, LuPlus } from "react-icons/lu";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ContentCard from '../components/ContentCard';
import StatusMessage from '../components/StatusMessage';
import { getUserEvents } from '../api/userservice';
import Loading from '../components/Loading';

function DashboardPage() {
    const { user, isAuthenticated } = useAuth();
    const [userEvents, setUserEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const state = useLocation();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!user?.id) {
                    setLoading(false);
                    return;
                }

                const response = await getUserEvents(user.id);
              

                if (response.data.success) {
                    setUserEvents(response.data.data);
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching events:', err);
                setError(err.message);
                setLoading(false);
            }
        };
        fetchUserData();
    }, [user]);

    if (loading) {
        return (
            <Loading message="Loading Dashboard" />
        );
    }

    if (error) {
        return (
            <StatusMessage alertType="error" alertMessage="Error fetching user data" 
            description="Please try again later.">
                <Button onClick={() => navigate('/')}>Back to home</Button>
            </StatusMessage>
        );
    }

    return (
        <div>
            <div className="mb-16">
                <Text variant="h1">Dashboard</Text>
                <Text variant="bodyLarge" className="text-gray-400">
                    Welcome back, {user?.name?.split(' ')[0]}
                </Text>
            </div>

            {user?.role === 'organizer' && (
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-8">
                        <Text variant="h2">Your Events:</Text>
                        <Button to="/create-event"><LuPlus className="mr-2" />Create Event</Button>
                    </div>
                    
                    {userEvents.length === 0 ? (
                        <StatusMessage 
                        alertType="info"
                        alertMessage="No events to show"
                    />
                    ) : (
                        <div className="grid grid-cols-1">
                            {userEvents.map(event => {
                                const eventUrl = `${window.location.origin}/event/${event.id}`;
                                return (
                                    <ContentCard key={event.id}
                                    onClick={() => navigate(`/event/${event._id}`)}>

                                        <Text variant="h3">{event.title}</Text>
                                        <Text variant="body" className="text-gray-400">
                                        {new Date(event.startTime).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric"
                                        })}
                                        &nbsp;&nbsp;–&nbsp;&nbsp;
                                        {new Date(event.endTime).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric"
                                        })}
                                        </Text>
                                        <Text variant="body" className="text-gray-400">
                                            {event.description}
                                        </Text>
                                        <div className="mt-4 flex gap-4 justify-center">    
                                            <Button variant="icon" icon={LuSquarePen}  onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/event/${event.id}/edit`, { state: { event } });}} />
                                            <Button variant="icon" icon={LuCopy} onClick={(e) => {
                                            e.stopPropagation(); 
                                            navigator.clipboard.writeText(eventUrl)
                                            navigate(location.pathname, { 
                                                state: { 
                                                    successMessage: 'Event link copied to clipboard' 
                                                },
                                                replace: true
                                            });
                                        }}/>
                                        </div>
                                    </ContentCard>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default DashboardPage;
