

const authService = {
    /**
     * Check configuration and initialize EmailJS
     * @returns {boolean} true if valid
     */
    /**
     * Initialize Auth Service
     * (In demo mode, this is a no-op but kept for API consistency)
     * @returns {boolean} always true
     */
    init() {
        console.log("🔧 Auth Service Initialized (DEMO MODE)");
        return true;
    },

    /**
     * Request OTP for the given email (DEMO MODE)
     * Generates a random OTP and logs it to the console.
     * @param {string} email
     * @returns {Promise<void>}
     */
    async sendOtp(email) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // 1. Generate random 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes from now

        // 2. Store in sessionStorage (Client-side temporary storage)
        sessionStorage.setItem("auth_otp", otp);
        sessionStorage.setItem("auth_otp_expiry", expiry.toString());
        sessionStorage.setItem("auth_email", email);

        // 3. Log OTP to console for user to see
        console.group("🔐 DEMO OTP GENERATED");
        console.log(`%cOTP for ${email}: ${otp}`, "color: #4ade80; font-weight: bold; font-size: 14px;");
        console.log("Please enter this code in the login screen.");
        console.groupEnd();
    },

    /**
     * Verify OTP and get token
     * @param {string} email
     * @param {string} otp
     * @returns {Promise<{token: string, user: object}>}
     */
    async verifyOtp(email, otp) {
        return new Promise((resolve, reject) => {
            // Simulate API delay
            setTimeout(() => {
                const storedOtp = sessionStorage.getItem("auth_otp");
                const storedExpiry = sessionStorage.getItem("auth_otp_expiry");
                const storedEmail = sessionStorage.getItem("auth_email");

                // 1. Validate existence
                if (!storedOtp || !storedExpiry || !storedEmail) {
                    reject(new Error("OTP session invalid or expired. Please request a new OTP."));
                    return;
                }

                // 2. Validate Email
                if (email !== storedEmail) {
                    reject(new Error("Email mismatch. Please start over."));
                    return;
                }

                // 3. Validate Expiry
                if (Date.now() > parseInt(storedExpiry, 10)) {
                    sessionStorage.removeItem("auth_otp"); // Clean up
                    reject(new Error("OTP has expired. Please request a new one."));
                    return;
                }

                // 4. Validate OTP
                if (otp !== storedOtp) {
                    reject(new Error("Invalid OTP. Please try again."));
                    return;
                }

                // 5. Success - Clear OTP and return mock session
                sessionStorage.removeItem("auth_otp");
                sessionStorage.removeItem("auth_otp_expiry");
                sessionStorage.removeItem("auth_email");

                resolve({
                    token: "mock-jwt-token-12345",
                    user: {
                        email: email,
                        name: "sriram", // Backend-ready: Will be populated from API
                        role: "user",
                        employeeId: "EMP0001" // Backend-ready: This will come from API
                    }
                });
            }, 800);
        });
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

// Attempt verification on load, but don't crash
try {
    authService.init();
} catch (e) {
    console.warn("Auto-initialization check failed", e);
}

export default authService;
