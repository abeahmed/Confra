const RSVP = require('../models/RSVP');
const Event = require('../models/Event');

exports.createRSVP = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { name, email } = req.body;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                success: false,
                error: 'Event not found'
            });
        }

        const rsvp = await RSVP.create({ event: eventId, name, email });

        res.status(201).json({
            success: true,
            data: rsvp
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
