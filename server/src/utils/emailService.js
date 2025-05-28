const { google } = require('googleapis');
const nodemailer = require('nodemailer');

const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
);

oAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

function makeRawMessage(from, to, subject, html) {
    const messageParts = [
        `From: ${from}`,
        `To: ${to}`,
        `Subject: ${subject}`,
        'Content-Type: text/html; charset=utf-8',
        '',
        html,
    ];
    const message = messageParts.join('\n');

    return Buffer.from(message)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

async function sendEmailAPI(to, subject, html) {
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
  
    const raw = makeRawMessage(process.env.EMAIL_FROM, to, subject, html);
  
    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw,
      },
    });
  
    return res.data;
}

const sendVerificationCode = async (email, name, code) => {
    const subject = 'Confra email verification';
    const html = `
        <h1>Your verification code</h1>
        <p>Hi ${name}:</p>
        <p>You're almost there! Please enter the code below to verify your email address:</p>
        <h1 style="font-size: 24px; letter-spacing: 2px; color: #333;">${code}</h1>
        <p>This code will expire in 10 minutes.</p>
        <p>If you did not request this verification, please ignore this email.</p>
        `;
    await sendEmailAPI(email, subject, html);
}

const sendConfirmation = async ({email, event, qrCodeDataUrl}) => {
    const subject = `Confra Event Confirmation: ${event.title}`
    const html = `
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
        `;
    await sendEmailAPI(email, subject, html);
}

const sendEmail = async ({ email, subject, html }) => {
    await sendEmailAPI(email, subject, html);
}

module.exports = { sendVerificationCode, sendConfirmation };