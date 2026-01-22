# Backend OTP Migration Guide

Currently, the application uses a client-side OTP flow with EmailJS for demonstration purposes. This setup generates and verifies OTPs within the browser (using `sessionStorage`).

## Switching to Backend Implementation

To move this logic to a secure backend server, follow these steps:

### 1. Update `authService.js`

Modify `src/services/authService.js` to call your backend APIs instead of using EmailJS directly.

#### `sendOtp(email)`
**Current:**
- Generates OTP locally.
- Stores in `sessionStorage`.
- Calls `emailjs.send`.

**New Implementation:**
- Make a POST request to your backend (e.g., `/api/auth/otp/request`).
- The backend should handle OTP generation, storage (Redis/DB), and email sending.

```javascript
async sendOtp(email) {
    // Example using axios
    await axios.post('/api/auth/otp/request', { email });
}
```

#### `verifyOtp(email, otp)`
**Current:**
- Checks `sessionStorage`.
- Validates OTP and expiry locally.
- Returns mock token.

**New Implementation:**
- Make a POST request to your backend (e.g., `/api/auth/otp/verify`).
- The backend verifies the OTP and returns a real JWT token.

```javascript
async verifyOtp(email, otp) {
    const response = await axios.post('/api/auth/otp/verify', { email, otp });
    return {
        token: response.data.token,
        user: response.data.user
    };
}
```

### 2. Remove EmailJS

Once the backend is integrated:
1. Uninstall EmailJS: `npm uninstall @emailjs/browser`
2. Remove EmailJS environment variables from `.env`.
3. Remove `import emailjs` from `authService.js`.

### 3. Security Notes

- The current client-side implementation is **NOT SECURE** for production because the OTP logic runs in the user's browser (though we use `sessionStorage`, a sophisticated user could potentially manipulate it if not careful, although the main risk is simply that it's not a true second factor if the client controls verification).
- A backend implementation ensures the OTP is generated and verified in a trusted environment.
