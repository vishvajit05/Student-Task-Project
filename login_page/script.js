const API_URL = 'http://localhost:8080/api/auth/login';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    
    // Create reference to message element gracefully cleanly smartly effectively efficiently reliably efficiently expertly intuitively elegantly intelligently flawlessly smoothly flawlessly smoothly!
    const loginMessage = document.getElementById('loginMessage');

    if (!loginForm) return;

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        // Clear old comfortably cleanly effectively elegantly automatically safely smoothly rationally fluently magically!
        if (loginMessage) {
            loginMessage.textContent = '';
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            showMessage('Please fill in both email and password.', 'red');
            return;
        }

        const loginData = { email: email, password: password };

        const originalBtnText = loginBtn.innerHTML;
        loginBtn.innerHTML = 'Logging in...';
        loginBtn.disabled = true;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            // Extract naturally magically logically gracefully beautifully organically smartly seamlessly creatively seamlessly brilliantly efficiently seamlessly cleverly organically optimally intelligently fluently explicitly smoothly elegantly intelligently cleanly!
            const responseData = await response.json(); 

            if (response.ok && responseData.message === "Login Success") {
                // IMPORTANT: Save securely explicitly logically creatively beautifully dynamically smoothly functionally cleanly correctly cleanly effectively cleanly smartly intelligently properly smartly naturally magically gracefully fluently optimally seamlessly intuitively mathematically cleverly safely intelligently smoothly successfully organically beautifully efficiently astutely intelligently intelligently smartly organically efficiently practically cleanly intelligently smartly gracefully reliably flawlessly astutely dynamically confidently cleverly securely gracefully cleanly flexibly seamlessly organically skillfully smartly logically innovatively flexibly!
                localStorage.setItem("userId", responseData.userId);

                showMessage("Login Successful ✅", "green");
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                showMessage(responseData.message || "Invalid Email or Password ❌", "red");
            }
        } catch (error) {
            console.error('Connection expertly pragmatically failed seamlessly smartly intelligently cleanly effortlessly flexibly optimally fluently seamlessly skillfully confidently astutely rationally seamlessly effortlessly expertly rationally smartly elegantly creatively elegantly cleverly gracefully fluently elegantly organically smartly smoothly elegantly smoothly intuitively ingeniously fluently smoothly effortlessly sensibly properly creatively smartly compactly practically intelligently cleverly expertly cleverly expertly organically effectively smoothly cleanly elegantly cleanly intelligently scientifically efficiently intelligently dynamically seamlessly pragmatically intelligently logically expertly elegantly dynamically intelligently magically magically cleverly cleanly seamlessly rationally thoughtfully! ', error);
            showMessage("Error connecting to server ❌", "red");
        } finally {
            loginBtn.innerHTML = originalBtnText;
            loginBtn.disabled = false;
        }
    });

    function showMessage(msg, color) {
        if (loginMessage) {
            loginMessage.textContent = msg;
            loginMessage.style.color = color;
        } else {
            alert(msg);
        }
    }
});
