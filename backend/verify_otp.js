
async function verifyOTP() {
    try {
        const response = await fetch('http://localhost:5000/api/auth/otp/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'test@example.com',
                otp: '645976'
            })
        });
        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Body:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

verifyOTP();
