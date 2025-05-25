import React, {useState} from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import EventForm from '../components/EventForm';
import { updateEvent } from '../api/eventservice';

const EditEventPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!state?.event) {
        navigate(`/event/${id}`);
        return null;
    }

   const handleSubmit = async (formData) => {
        try {
            setLoading(true);
            const response = await updateEvent(id, formData);
            const updatedEvent = response.data.data;
            navigate(`/event/${id}`, {
                state: { 
                    successMessage: 'Event updated successfully' 
                }
            });
        } catch (err) {
            setError('Failed to update event');
            setLoading(false);
        }
    };

    return (
        <EventForm
            initialData={state.event}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
            submitText="Update"
            title="Edit Event"
        />
    )
}

export default EditEventPage;