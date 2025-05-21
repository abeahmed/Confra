import api from './axios';

export const getUserEvents = async (userId) => {
    return api.get(`/events?organizer=${userId}`);
};