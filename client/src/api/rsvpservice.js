import api from './axios';

export const initiateVerification = (eventId, { name, email }) => {
    return api.post(`/rsvp/${eventId}/verify-email`, { name, email });
};

export const createRSVP = (eventId, { code }) => {
    return api.post(`/rsvp/${eventId}`, { code });
};

