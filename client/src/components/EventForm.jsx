import React, { useState } from 'react';
import InputField from './InputField';
import Button from './Button';
import Text from './Text';
import Alert from './Alert';
import Spinner from './Spinner';

function EventForm({
    initialData = {
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
    },
    onSubmit,
    loading,
    error,
    submitText = 'Create Event',
    title = 'Create New Event'
}) {
    const [eventData, setEventData] = useState(initialData);

    const handleChange = (e) => {
        const{id, value} = e.target;
        setEventData(prev => ({ ...prev, [id]: value }));
    };

    const validateForm = () => {
        return eventData.title && 
               eventData.description && 
               eventData.startTime && 
               eventData.endTime && 
               eventData.venue && 
               eventData.address && 
               eventData.capacity && 
               eventData.category;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(eventData);
    };

    return (
    <div>
        <div className="mb-8">
            <Text variant="h1">{title}</Text>
        </div>
        <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
            <InputField name="Title:" id="title" type="text" value={eventData.title} onChange={handleChange}/>
            <InputField name="Starts at:" id="startTime" type="datetime-local" value={eventData.startTime} onChange={handleChange}/>
            <InputField name="Ends at:" id="endTime" type="datetime-local" value={eventData.endTime} onChange={handleChange}/>
            <InputField name="Venue:" id="venue" type="text" value={eventData.venue} onChange={handleChange}/>
            <InputField name="Address:" id="address" type="textarea" value={eventData.address} onChange={handleChange}/>
            <InputField name="Capacity:" id="capacity" type="number" min="1" value={eventData.capacity} onChange={handleChange}/>
            <InputField name="Category:" id="category" type="select" value={eventData.category} onChange={handleChange}>
                <option value="">Select a category</option>
                <option value="CONFERENCE">Conference</option>
                <option value="SEMINAR">Seminar</option>
                <option value="WORKSHOP">Workshop</option>
                <option value="NETWORKING">Networking</option>
                <option value="CULTURAL">Cultural</option>
                <option value="SPORTS">Sports</option>
                <option value="OTHER">Other</option>
            </InputField>
            <InputField name="Add a description:" id="description" type="textarea" value={eventData.description} onChange={handleChange}/>

            
            <Button 
                type="submit" 
                disabled={!validateForm()}
            >
                {submitText}
            </Button>
        

            {error && <Alert type="error">{error}</Alert>}
        </form>
    </div>
        
    );
}


export default EventForm;