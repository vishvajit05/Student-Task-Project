document.addEventListener('DOMContentLoaded', () => {
    const verifyForm = document.getElementById('verifyForm');
    const otpInput = document.getElementById('otp');
    const verifyOtpBtn = document.getElementById('verifyOtpBtn');

    // Retrieve the email the user requested an OTP memory instance for
    const email = localStorage.getItem('resetEmail');
    if (!email) {
        alert('No active password reset operation found. Please enter your email securely first.');
        window.location.href = 'forgot.html';
    }

    verifyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const otp = otpInput.value.trim();
        if (!otp) return;

        verifyOtpBtn.innerHTML = 'Verifying...';
        verifyOtpBtn.disabled = true;

        try {
            const formData = new URLSearchParams();
            formData.append("email", email);
            formData.append("otp", otp);

            const response = await fetch('http://localhost:8080/api/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData
            });

            if (response.ok) {
                alert('OTP Code Verified! You can confidently reset your password now.');
                window.location.href = 'reset.html';
            } else {
                const errText = await response.text();
                alert('Verification Failed: ' + errText);
            }
        } catch (error) {
            console.error(error);
            alert('Encountered an error trying to ping the verification endpoint.');
        } finally {
            verifyOtpBtn.innerHTML = 'Verify OTP';
            verifyOtpBtn.disabled = false;
        }
    });
});
