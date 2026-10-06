document.addEventListener('DOMContentLoaded', () => {
    const forgotForm = document.getElementById('forgotForm');
    const emailInput = document.getElementById('email');
    const sendOtpBtn = document.getElementById('sendOtpBtn');

    forgotForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        if (!email) return;

        sendOtpBtn.innerHTML = 'Sending...';
        sendOtpBtn.disabled = true;

        try {
            // Spring Boot backend uses @RequestParam, which translates to x-www-form-urlencoded
            const formData = new URLSearchParams();
            formData.append("email", email);

            const response = await fetch('http://localhost:8080/api/auth/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData
            });

            if (response.ok) {
                // Save the email into LocalStorage across pages temporarily
                localStorage.setItem('resetEmail', email);
                alert('Success! An OTP has been sent securely to your email address.');
                window.location.href = 'verify.html';
            } else {
                const errText = await response.text();
                alert('Server validation failed: ' + errText);
            }
        } catch (error) {
            console.error(error);
            alert('Encountered an error trying to connect to the backend Server.');
        } finally {
            sendOtpBtn.innerHTML = 'Send OTP';
            sendOtpBtn.disabled = false;
        }
    });
});
