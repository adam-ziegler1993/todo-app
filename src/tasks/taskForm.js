import { saveTask } from '../storage.js';
import { displayContent } from '../index.js';

// Form overlay for tasks
export function openTaskForm() {
    const formHtml = `
        <div class="form-overlay">
            <div class="task-form">
                <h2>Add New Task</h2>
                <label for="taskName">Task Name:</label>
                <input type="text" id="taskName" required>
                
                <label for="description">Description:</label>
                <textarea id="description" required></textarea>
                
                <label for="dueDate">Due Date:</label>
                <input type="date" id="dueDate" required>
                
                <label for="priority">Priority:</label>
                <select id="priority" required>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                
                <button id="saveTaskBtn">Save Task</button>
                <button id="cancelBtn">Cancel</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', formHtml);
    
    const saveTaskBtn = document.getElementById('saveTaskBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    
    saveTaskBtn.addEventListener('click', handleTaskSubmission);
    cancelBtn.addEventListener('click', closeTaskForm);
}

// Handle task submission
export function handleTaskSubmission() {
    const taskName = document.getElementById('taskName').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;
    
    const task = {
        taskName,
        description,
        dueDate,
        priority
    };

    saveTask(task);
    closeTaskForm();
    displayContent();  // Refresh the content display
}

// Close task form
export function closeTaskForm() {
    const formOverlay = document.querySelector('.form-overlay');
    if (formOverlay) {
        formOverlay.remove();
    }
}
