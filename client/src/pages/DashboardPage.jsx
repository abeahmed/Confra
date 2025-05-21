import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Text from '../components/Text';
import PageContainer from '../components/PageContainer';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import ContentCard from '../components/ContentCard';
import StatusMessage from '../components/StatusMessage';
import { getUserEvents } from '../api/userservice';
import Loading from '../components/Loading';

function DashboardPage() {
    const { user, isAuthenticated } = useAuth();
    const [userEvents, setUserEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  

    useEffect(() => {
        console.log('Auth State:', { 
            user, 
            isAuthenticated,
            userId: user?.id,
            userRole: user?.role,
            fullUser: user 
        });
        const fetchUserData = async () => {
            try {
                if (!user?.id) {
                    console.log('User ID not available yet');
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
            <PageContainer>
                <Loading message="Loading Dashboard" />
            </PageContainer>
        );
    }

    if (error) {
        return (
            <PageContainer>
                <StatusMessage alertType="error" alertMessage="Error fetching user data" 
                description="Please try again later.">
                    <Button onClick={() => navigate('/')}>Back to home</Button>
                </StatusMessage>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
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
                        <Button to="/create-event">Create New</Button>
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
                                    <ContentCard key={event.id}>
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
                                            <Button variant="nav" to={eventUrl}>View Event</Button>
                                            <Button variant ="nav" onClick={() => navigator.clipboard.writeText(eventUrl)}>Copy link</Button>
                                        </div>
                                    </ContentCard>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </PageContainer>
    );
}

export default DashboardPage;
