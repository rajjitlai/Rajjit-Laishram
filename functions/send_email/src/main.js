const nodemailer = require('nodemailer');

module.exports = async ({ req, res, log, error }) => {
    // Only process if it's an event trigger (e.g. databases.[id].collections.[id].documents.create)
    // Or handle manual trigger for testing

    try {
        const payload = req.bodyJson || JSON.parse(req.body); // Handle parsing safety

        // Support both contact form (firstname/lastname) and review form (fullname)
        const name = payload.fullname || `${payload.firstname || ''} ${payload.lastname || ''}`.trim() || 'Anonymous';
        const email = payload.email || 'N/A';
        const message = payload.message || payload.description || '';

        if (!message) {
            log('Missing email or message in payload');
            return res.json({ error: 'Missing required fields' }, 400);
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER, // Your Gmail address
                pass: process.env.SMTP_PASS, // Your 16-character App Password
            },
        });

        // Send email to Admin
        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `New Portfolio Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
        });

        log(`Email successfully sent for contact from ${email}`);
        return res.json({ success: true, message: 'Email sent successfully' });

    } catch (err) {
        error("Error sending email: " + err.message);
        return res.json({ success: false, error: err.message }, 500);
    }
};
