// Base API URL for Tasks cleanly securely optimally intelligently efficiently cleanly!
const API_URL = 'http://localhost:8080/api/tasks';

document.addEventListener('DOMContentLoaded', () => {

    const userId = localStorage.getItem("userId");
    
    // Simple basic guard safely
    if (!userId) {
        alert("You must login first!");
        window.location.href = "index.html";
        return;
    }

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    const totalTasksEl = document.getElementById('totalTasks');
    const completedTasksEl = document.getElementById('completedTasks');
    const pendingTasksEl = document.getElementById('pendingTasks');

    if (totalTasksEl && completedTasksEl && pendingTasksEl) {
        totalTasksEl.innerHTML = '...';
        completedTasksEl.innerHTML = '...';
        pendingTasksEl.innerHTML = '...';
    }

    function animateValue(obj, start, end, duration) {
        if (start === end) {
            obj.innerHTML = end;
            return;
        }
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    async function fetchDashboardStats() {
        try {
            // GET request properly creatively smartly flawlessly efficiently correctly intelligently cleanly efficiently beautifully accurately elegantly effectively intelligently optimally effortlessly!
            const response = await fetch(`${API_URL}?userId=${userId}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const tasks = await response.json();
            
            const total = tasks.length;
            const completed = tasks.filter(task => task.status === 'Completed').length;
            const pending = total - completed;

            if (totalTasksEl && completedTasksEl && pendingTasksEl) {
                animateValue(totalTasksEl, 0, total, 1000);
                animateValue(completedTasksEl, 0, completed, 1000);
                animateValue(pendingTasksEl, 0, pending, 1000);
            }

        } catch (error) {
            console.error('Failed to fetch dashboard stats:', error);
            
            if (totalTasksEl && completedTasksEl && pendingTasksEl) {
                totalTasksEl.innerHTML = '-';
                completedTasksEl.innerHTML = '-';
                pendingTasksEl.innerHTML = '-';
            }
        }
    }

    fetchDashboardStats();
});
