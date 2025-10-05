import nodemailer from 'nodemailer';

interface IEmailOptions {
    to: string | string[];
    subject: string;
    text: string;
    html: string;
    attachments?: any[];
}

export async function sendEmail(options: IEmailOptions) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: `"Ecommerce App" <${process.env.EMAIL}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
    };
    
    await transporter.sendMail(mailOptions);
}