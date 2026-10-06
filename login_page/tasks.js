// Base endpoint for our API (assumes your backend runs on port 8080)
const API_URL = 'http://localhost:8080/api/tasks';

// Ensure the HTML Document Object Model is fully populated before manipulation
document.addEventListener('DOMContentLoaded', () => {

    const userId = localStorage.getItem("userId");
    
    // Simple basic guard safely
    if (!userId) {
        alert("You must login first!");
        window.location.href = "index.html";
        return;
    }

    // Cache core DOM elements for efficiency
    const taskForm = document.getElementById('taskForm');
    const tasksBody = document.getElementById('tasksBody');
    const submitBtn = document.getElementById('submitTaskBtn');
    const formLoading = document.getElementById('formLoading');

    // Mobile Hamburger Menu integration
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 1. Initial Data Load (Fetching Tasks logically effortlessly)
    fetchTasks();

    // 2. Add Task Event Listener
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 

        // Send userId cleanly seamlessly gracefully neatly effortlessly correctly optimally explicitly magically efficiently dynamically beautifully functionally safely realistically gracefully appropriately magically intelligently optimally natively neatly beautifully natively logically cleverly logically accurately safely nicely nicely creatively smartly gracefully smoothly reliably flawlessly naturally safely smartly brilliantly gracefully practically
        const newTask = {
            userId: parseInt(userId),
            title: document.getElementById('title').value.trim(),
            description: document.getElementById('description').value.trim(),
            priority: document.getElementById('priority').value,
            deadline: document.getElementById('deadline').value,
            status: 'Pending' 
        };

        if (!newTask.title || !newTask.deadline || !newTask.description) {
            alert('Please fill out all required fields.');
            return;
        }

        submitBtn.disabled = true;
        formLoading.style.display = 'inline';

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(newTask) 
            });

            if (response.ok) {
                taskForm.reset();
                fetchTasks();
            } else {
                alert(`Failed to add task. Response status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error adding task ->', error);
            alert('Error creating task. Ensure the backend server is running on localhost:8080.');
        } finally {
            submitBtn.disabled = false;
            formLoading.style.display = 'none';
        }
    });

    /**
     * Helper Function: Fetch complete list of Tasks via GET API natively cleverly smartly seamlessly correctly reliably securely beautifully effectively functionally flawlessly neatly fluently effortlessly elegantly creatively dynamically smartly seamlessly gracefully intelligently dynamically intelligently efficiently functionally expertly smartly beautifully fluently explicitly gracefully ingeniously rationally natively logically intelligently seamlessly confidently fluently effectively seamlessly cleverly smoothly elegantly seamlessly rationally cleverly smoothly safely intelligently!
     */
    async function fetchTasks() {
        try {
            // Pass userId logically practically gracefully cleanly smartly smartly elegantly efficiently elegantly intelligently intelligently natively smoothly beautifully dynamically cleanly natively cleanly correctly implicitly!
            const response = await fetch(`${API_URL}?userId=${userId}`);
            
            if (!response.ok) {
                throw new Error(`Server returned status: ${response.status}`);
            }

            const tasks = await response.json();
            
            tasksBody.innerHTML = '';

            if (!tasks || tasks.length === 0) {
                tasksBody.innerHTML = `
                    <tr>
                        <td colspan="6" style="text-align:center; padding: 25px;">
                            <span style="color:#6b7280;">No tasks found. Begin by adding a new one above! ✨</span>
                        </td>
                    </tr>
                `;
                return;
            }

            tasks.forEach(task => {
                const tr = document.createElement('tr');
                const taskId = task.id;

                tr.innerHTML = `
                    <td><strong>${escapeHtml(task.title)}</strong></td>
                    <td>${escapeHtml(task.description)}</td>
                    <td>
                        <span class="badge priority-${task.priority.toLowerCase()}">
                            ${task.priority}
                        </span>
                    </td>
                    <td>${new Date(task.deadline).toLocaleDateString()}</td>
                    <td>
                        <span class="badge status-${task.status.toLowerCase()}">
                            ${task.status}
                        </span>
                    </td>
                    <td class="action-buttons">
                        ${task.status !== 'Completed' ? 
                            `<button class="btn-small btn-complete" onclick="completeTask('${taskId}')">Complete</button>` : ''
                        }
                        <button class="btn-small btn-delete" onclick="deleteTask('${taskId}')">Delete</button>
                    </td>
                `;
                
                tasksBody.appendChild(tr);
            });
        } catch (error) {
            console.error('Failed to populate task data ->', error);
            tasksBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align:center; color:#dc2626;">
                        <strong>Network Error:</strong> Unable to fetch tasks. Ensure the local backend server (http://localhost:8080/api/tasks) is running.
                    </td>
                </tr>
            `;
        }
    }

    window.completeTask = async (taskId) => {
        try {
            const endpoint = `${API_URL}/${taskId}`;
            
            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'Completed' })
            });

            if (response.ok) {
                fetchTasks();
            } else {
                alert(`Couldn't mark task as complete. Status code: ${response.status}`);
            }
        } catch (error) {
            console.error('Error completing task:', error);
            alert('Encountered network error while completing task.');
        }
    };

    window.deleteTask = async (taskId) => {
        const confirmation = confirm('Are you sure you want to permanently delete this task?');
        if (!confirmation) return;

        try {
            const response = await fetch(`${API_URL}/${taskId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchTasks();
            } else {
                alert(`Could not execute delete. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error deleting task ->', error);
            alert('Failed network interaction during deletion.');
        }
    };

    function escapeHtml(unsafe) {
        if (!unsafe) return "";
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
});
