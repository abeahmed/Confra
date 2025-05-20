import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import InputField from '../components/InputField';
import Button from '../components/Button';
import { createEvent } from '../api/eventservice';
import Text from '../components/Text';
import PageContainer from '../components/PageContainer';

function CreateEventPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [createdEventId, setCreatedEventId] = useState(null);
    const [error, setError] = useState(null);
    const [eventData, setEventData] = useState({
        title: '',
        startTime: '',
        endTime: '',
        venue: '',
        address: '',
        capacity: '',
        category: '',
        description: '',
        ticketPrice: 0,
        isPublished: true
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const{id, value} = e.target;
        setEventData({...eventData, [id]: value});
    };

    const handleSubmit = async (e) => {
        console.log('Sending event data:', eventData);
        e.preventDefault();
        setIsLoading(true);
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
            setIsLoading(false);
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
        <div className="mb-8">
            <Text variant="h1">Create New Event</Text>
        </div>
        <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
            <InputField name="Title:" id="title" type="text" onChange={handleChange}/>
            <InputField name="Starts at:" id="startTime" type="datetime-local" onChange={handleChange}/>
            <InputField name="Ends at:" id="endTime" type="datetime-local" onChange={handleChange}/>
            <InputField name="Venue:" id="venue" type="text" onChange={handleChange}/>
            <InputField name="Address:" id="address" type="textarea" onChange={handleChange}/>
            <InputField name="Capacity:" id="capacity" type="number" min="1" onChange={handleChange}/>
            <InputField name="Category:" id="category" type="select" onChange={handleChange}>
                <option value="">Select a category</option>
                <option value="CONFERENCE">Conference</option>
                <option value="SEMINAR">Seminar</option>
                <option value="WORKSHOP">Workshop</option>
                <option value="NETWORKING">Networking</option>
                <option value="CULTURAL">Cultural</option>
                <option value="SPORTS">Sports</option>
                <option value="OTHER">Other</option>
            </InputField>
            <InputField name="Add a description:" id="description" type="textarea" onChange={handleChange}/>

            
            <Button 
                type="submit" 
                disabled={isLoading}>
                
                {isLoading ? 'Creating...' : 'Create Event'}
            </Button>
        

            {error && <Alert type="error">{error}</Alert>}
        </form>
    </PageContainer>
     
    )
    

}


export default CreateEventPage;