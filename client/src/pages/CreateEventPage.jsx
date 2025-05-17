import React, { useState } from 'react';
import { Link } from "react-router-dom";
import InputField from '../components/InputField';
import Button from '../components/Button';

function CreateEventPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [eventData, setEventData] = useState({
        name: '',
        date: '',
        time: '',
        location: '',
        description:'',
        totalTickets:''
    });

    const handleChange = (e) => {
        const{id, value} = e.target;
        setEventData({...eventData, [id]: value});
    };

    return (
        <div className="flex flex-col items-center justify-center text-center mt-20">
            <form className="w-full max-w-md">
                <InputField name="Name your event" id="name"/>
                <InputField name="Date" id="date" type="date"/>
                <InputField name="Time" id="time" type="time"/>
                <InputField name="Location" id="location"/>
                <InputField name="Add a description" id="description"/>

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