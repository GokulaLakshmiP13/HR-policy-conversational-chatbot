// Basic fetch if node version supports it, else use http
// Assuming Node 18+
async function requestOTP() {
    try {
        const response = await fetch('http://localhost:5000/api/auth/otp/request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'test@example.com' })
        });
        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Body:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

requestOTP();
