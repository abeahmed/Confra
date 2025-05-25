const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendVerificationCode = async (email, name, code) => {

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Confra email verification',
        html: `
        <h1>Your verification code</h1>
        <p>Hi ${name}:</p>
        <p>You're almost there! Please enter the code below to verify your email address:</p>
        <h1 style="font-size: 24px; letter-spacing: 2px; color: #333;">${code}</h1>
        <p>This code will expire in 10 minutes.</p>
        <p>If you did not request this verification, please ignore this email.</p>
        `
    };

    await transporter.sendMail(mailOptions);
}

const sendConfirmation = async ({email, event, qrCodeDataUrl}) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email, 
        subject: `Confra Event Confirmation: ${event.title}`,
        html: `
            <h1>Registration Confirmed</h1>
            <p>You're all set to attend ${event.title}!</p>
            <h2>Event Details:</h2>
            <ul>
                <li>Date: ${new Date(event.startTime).toLocaleDateString()}</li>
                <li>Time: ${new Date(event.startTime).toLocaleTimeString()}</li>
                <li>Venue: ${event.venue}</li>
                <li>Address: ${event.address}</li>
            </ul>
            <h2>Your QR Code Ticket:</h2>
            <img src="${qrCodeDataUrl}" alt="Event QR Code" />
            <p>Please show this QR code at the event.</p>
            <p>We look forward to seeing you there!</p>
        `
    };

    await transporter.sendMail(mailOptions);
}

const sendEmail = async ({ to, subject, html }) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html
    };

    await transporter.sendMail(mailOptions);
}

module.exports = { sendVerificationCode, sendConfirmation };