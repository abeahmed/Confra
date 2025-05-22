import api from './axios';

export const createEvent = async (eventData) => {
    return api.post('/events', eventData);
};

export const getEvent = async (eventId) => {
    return api.get(`/events/${eventId}`);
};

export const updateEvent = async (eventId, eventData) => {
    return api.put(`/events/${eventId}`, eventData);
};

export const deleteEvent = async (eventId) => {
    return api.delete(`/events/${eventId}`);
};