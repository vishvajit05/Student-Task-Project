document.addEventListener('DOMContentLoaded', () => {
    const resetForm = document.getElementById('resetForm');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const resetBtn = document.getElementById('resetBtn');

    const email = localStorage.getItem('resetEmail');
    if (!email) {
        alert('Invalid memory routing. Redirecting you to initialize properly.');
        window.location.href = 'forgot.html';
    }

    resetForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const newPassword = newPasswordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Safety redundancy to eliminate mismatched credentials directly locally
        if (newPassword !== confirmPassword) {
            alert('Your passwords strings do not overlap. Please match them.');
            return;
        }
        
        if (newPassword.length < 6) {
            alert('Your password must contain at least 6 characters total.');
            return;
        }

        resetBtn.innerHTML = 'Configuring securely...';
        resetBtn.disabled = true;

        try {
            const formData = new URLSearchParams();
            formData.append("email", email);
            formData.append("newPassword", newPassword);

            const response = await fetch('http://localhost:8080/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData
            });

            if (response.ok) {
                alert('Your password hash has successfully been reconstructed mapping across your entity!\nYou may now seamlessly log in with your updated configurations.');
                localStorage.removeItem('resetEmail'); // Garbage clean
                window.location.href = 'index.html';
            } else {
                const errText = await response.text();
                alert('Backend Modification Failed: ' + errText);
            }
        } catch (error) {
            console.error(error);
            alert('An unknown disruption was flagged during transmission.');
        } finally {
            resetBtn.innerHTML = 'Reset Password';
            resetBtn.disabled = false;
        }
    });
});
