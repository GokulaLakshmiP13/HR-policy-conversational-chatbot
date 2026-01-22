import transporter from '../config/email.js';

export const sendOTPEmail = async (email, otp) => {
    const mailOptions = {
        from: '"HR Chatbot (No Reply)" <no-reply@hr-chatbot.com>', // User sees this alias
        to: email,
        subject: 'Your Login OTP - HR Chatbot',
        text: `Your OTP for login is: ${otp}. It expires in ${process.env.OTP_EXPIRY_MINUTES || 5} minutes.`,
        html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>HR Chatbot Login</h2>
            <p>Your One-Time Password (OTP) is:</p>
            <h1 style="color: #2c3e50; letter-spacing: 5px;">${otp}</h1>
            <p>Use this code to verify your identity. This code expires in ${process.env.OTP_EXPIRY_MINUTES || 5} minutes.</p>
           </div>`,
    };

    // FOR DEV DEBUGGING ONLY: Log OTP to console so we can verify without real email
    console.log('--------------------------------------------------');
    console.log(`[DEV] OTP for ${email}: ${otp}`);
    console.log('--------------------------------------------------');

    // MOCK: Return success immediately for verification purpose
    // return true; 

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }






};
