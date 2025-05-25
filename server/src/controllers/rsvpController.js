const RSVP = require('../models/RSVP');
const Event = require('../models/Event');
const { sendVerificationCode } = require('../utils/emailService');

const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.initiateVerification = async (req, res) => {
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

        const existingRSVP = await RSVP.findOne({ email:email, event:eventId });
        if (existingRSVP) {
            return res.status(400).json({
                success: false,
                error: "Already signed up"
            });
        }

        const verificationCode = generateVerificationCode();

        req.session.verification = {
            code: verificationCode,
            expires: new Date(Date.now() + 10 * 60 * 1000),
            name,
            email, 
            eventId
        };

        await sendVerificationCode(email, name, verificationCode);

        res.status(201).json({
            success: true,
            message: 'Verification code sent'
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Something went wrong'
        });
    }
};

exports.createRSVP = async (req, res) => {
    try {
        const { code } = req.body;
        const verification = req.session.verification;

        if (!verification) {
            return res.status(400).json({
                success: false,
                error: 'No verification attempt found'
            });
        }

        if (new Date() > verification.expires) {
            return res.status(400).json({
                success: false,
                error: 'Verification code has expired'
            });
        }

        if (code !== verification.code) {
            return res.status(400).json({
                success: false,
                error: 'Invalid verification code'
            });
        }

        const existingRSVP = await RSVP.findOne({ email: verification.email });
        if (existingRSVP) {
            return res.status(400).json({
                success: false,
                error: 'Email already signed up'
            });
        }

           // Create RSVP only after verification
        const rsvp = await RSVP.create({
            event: verification.eventId,
            name: verification.name,
            email: verification.email,
            isVerified: true
        });

        delete req.session.verification;

        res.status(201).json({
            success: true,
            data: rsvp
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Something went wrong'
        });
    }
};

