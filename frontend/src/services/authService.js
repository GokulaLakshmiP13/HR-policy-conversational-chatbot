
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/auth/otp';

const authService = {
    /**
     * Initialize Auth Service
     */
    init() {
        console.log("🔧 Auth Service Initialized (Backend Mode)");
        return true;
    },

    /**
     * Request OTP for the given email
     * @param {string} email
     * @returns {Promise<void>}
     */
    async sendOtp(email) {
        try {
            const response = await fetch(`${API_URL}/request`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to send OTP');
            }
        } catch (error) {
            console.error("Send OTP Error:", error);
            throw error;
        }
    },

    /**
     * Verify OTP and get token
     * @param {string} email
     * @param {string} otp
     * @returns {Promise<{token: string, user: object}>}
     */
    async verifyOtp(email, otp) {
        try {
            const response = await fetch(`${API_URL}/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Invalid OTP');
            }

            const data = await response.json();

            // Enrich user object with placeholders since backend DB isn't ready
            const enrichedUser = {
                ...data.user,
                name: data.user.email.split('@')[0], // Derive name from email
                role: "user",
                employeeId: "EMP-PENDING"
            };

            return {
                token: data.token,
                user: enrichedUser
            };
        } catch (error) {
            console.error("Verify OTP Error:", error);
            throw error;
        }
    },

    /**
     * Logout user
     */
    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.clear();
    }
};

export default authService;
