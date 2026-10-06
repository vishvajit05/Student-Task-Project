const API_URL = 'http://localhost:8080/api/auth/register';

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const registerBtn = document.getElementById('registerBtn');

    if (!registerForm) return;

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        if (!name || !email || !password || !confirmPassword) {
            alert('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
        
        const registerData = { name: name, email: email, password: password };

        const originalBtnText = registerBtn.innerHTML;
        registerBtn.innerHTML = 'Registering...';
        registerBtn.disabled = true;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            });

            if (response.ok) {
                alert('Registration Successful ✅\n\nYou can now log in.');
                window.location.href = 'index.html';
            } else {
                const errorResponse = await response.text();
                alert('Registration Failed: ' + errorResponse);
            }
        } catch (error) {
            console.error('Registration API Error:', error);
            alert('Error connecting to Server.');
        } finally {
            registerBtn.innerHTML = originalBtnText;
            registerBtn.disabled = false;
        }
    });
});
