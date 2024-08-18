import { saveProject } from '../storage.js';
import { displayContent } from '../index.js';

// Form overlay for projects
export function openProjectForm() {
    const formHtml = `
        <div class="form-overlay">
            <div class="project-form">
                <h2>Add New Project</h2>
                <label for="projectName">Project Name:</label>
                <input type="text" id="projectName" required>
                
                <label for="projectDescription">Description:</label>
                <textarea id="projectDescription" required></textarea>
                
                <label for="projectDueDate">Due Date:</label>
                <input type="date" id="projectDueDate" required>
                
                <label for="projectPriority">Priority:</label>
                <select id="projectPriority" required>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                
                <button id="saveProjectBtn">Save Project</button>
                <button id="cancelBtn">Cancel</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', formHtml);
    
    const saveProjectBtn = document.getElementById('saveProjectBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    
    saveProjectBtn.addEventListener('click', handleProjectSubmission);
    cancelBtn.addEventListener('click', closeProjectForm);
}

// Handle project submission
export function handleProjectSubmission() {
    const projectName = document.getElementById('projectName').value;
    const projectDescription = document.getElementById('projectDescription').value;
    const projectDueDate = document.getElementById('projectDueDate').value;
    const projectPriority = document.getElementById('projectPriority').value;
    
    const project = {
        projectName,
        projectDescription,
        projectDueDate,
        projectPriority
    };

    saveProject(project);
    closeProjectForm();
    displayContent();  // Refresh the content display
}

// Close project form
export function closeProjectForm() {
    const formOverlay = document.querySelector('.form-overlay');
    if (formOverlay) {
        formOverlay.remove();
    }
}
