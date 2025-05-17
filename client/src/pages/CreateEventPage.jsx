import React, { useState } from 'react';
import { Link } from "react-router-dom";
import InputField from '../components/InputField';
import Button from '../components/Button';
import { createEvent } from '../api/eventservice';

function CreateEventPage() {
    const [isLoading, setIsLoading] = useState(false);
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
    });

    const handleChange = (e) => {
        const{id, value} = e.target;
        setEventData({...eventData, [id]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {

            const data = await createEvent(eventData);
            console.log('Event created:', response);

            } catch (err) {
                console.error('Error creating event:', err);
                setError(err.message || 'An error occurred while creating the event');
            } finally {
                setIsLoading(false);
            }
            
    };

    return (
        <div className="flex flex-col items-center justify-center text-center mt-20">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form className="w-full max-w-md" onSubmit={handleSubmit}>
                <InputField name="Name your event:" id="title" type="text" onChange={handleChange}/>
                <InputField name="Starts at:" id="startTime" type="datetime-local" onChange={handleChange}/>
                <InputField name="Ends at:" id="endTime" type="datetime-local" onChange={handleChange}/>
                <InputField name="Venue:" id="venue" type="text" onChange={handleChange}/>
                <InputField name="Address:" id="address" type="text" onChange={handleChange}/>
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
                <InputField name="Add a description:" id="description" type="text" onChange={handleChange}/>

                <Button 
                    type="submit" 
                    disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create'}
                </Button>
            </form>
        </div>
    )
    

}


export default CreateEventPage;