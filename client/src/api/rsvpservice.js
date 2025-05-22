import api from './axios';

export const rsvpToEvent = (eventId, { name, email }) => {
    return api.post(`/rsvp/${eventId}`, { name, email });
};