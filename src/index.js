import "./styles.css";
import "./tasks/formStyles.css";
import "./projects/projects.css";

import { openTaskForm, handleTaskSubmission, closeTaskForm } from './tasks/taskForm.js';
import { openProjectForm, handleProjectSubmission, closeProjectForm } from './projects/projects.js';
import { getTasks, getProjects } from './storage.js';

// Event listeners for loading tasks and projects
document.addEventListener('DOMContentLoaded', () => {
    const tasksLink = document.querySelector('.tasks-link');
    const projectsLink = document.querySelector('.projects-link');
    
    tasksLink.addEventListener('click', openTaskForm);
    projectsLink.addEventListener('click', openProjectForm);
    
    displayContent(); // Display both tasks and projects
});

export function displayContent() {
    const tasks = getTasks();
    const projects = getProjects();
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = '<h2>Your Tasks and Projects</h2>';
    
    if (tasks.length === 0 && projects.length === 0) {
        mainContent.innerHTML += '<p>No tasks or projects available.</p>';
        return;
    }

    // Display tasks
    mainContent.innerHTML += '<h3>Tasks</h3>';
    if (tasks.length === 0) {
        mainContent.innerHTML += '<p>No tasks available.</p>';
    } else {
        tasks.forEach((task, index) => {  // Use the index to identify tasks
            const taskHtml = `
                <div class="task" style="border-left: 10px solid ${getPriorityColor(task.priority)};">
                    <h4>${task.taskName}</h4>
                    <p>${task.description}</p>
                    <p>Due: ${task.dueDate}</p>
                    <button class="edit-task" data-index="${index}">Edit</button>
                    <button class="delete-task" data-index="${index}">Delete</button>
                </div>
            `;
            mainContent.insertAdjacentHTML('beforeend', taskHtml);
        });
    }

    // Display projects
    mainContent.innerHTML += '<h3>Projects</h3>';
    if (projects.length === 0) {
        mainContent.innerHTML += '<p>No projects available.</p>';
    } else {
        projects.forEach((project, index) => {  // Use the index to identify projects
            const projectHtml = `
                <div class="project" style="border-left: 10px solid ${getPriorityColor(project.priority)};">
                    <h4>${project.projectName}</h4>
                    <p>${project.description}</p>
                    <p>Due: ${project.dueDate}</p>
                    <button class="edit-project" data-index="${index}">Edit</button>
                    <button class="delete-project" data-index="${index}">Delete</button>
                </div>
            `;
            mainContent.insertAdjacentHTML('beforeend', projectHtml);
        });
    }

    // Add event listeners for edit and delete buttons after rendering
    attachTaskEventListeners();
    attachProjectEventListeners();
}

function attachTaskEventListeners() {
    document.querySelectorAll('.delete-task').forEach(button => {
        button.addEventListener('click', deleteTask);
    });
    
    document.querySelectorAll('.edit-task').forEach(button => {
        button.addEventListener('click', editTask);
    });
}

function attachProjectEventListeners() {
    document.querySelectorAll('.delete-project').forEach(button => {
        button.addEventListener('click', deleteProject);
    });
    
    document.querySelectorAll('.edit-project').forEach(button => {
        button.addEventListener('click', editProject);
    });
}

// Function to handle deleting tasks
function deleteTask(event) {
    const index = event.target.dataset.index;
    let tasks = getTasks();
    tasks.splice(index, 1);  // Remove the task from the array
    localStorage.setItem('tasks', JSON.stringify(tasks));  // Update localStorage
    displayContent();  // Refresh the content display
}

// Function to handle editing tasks
function editTask(event) {
    const index = event.target.dataset.index;
    let tasks = getTasks();
    const task = tasks[index];
    
    // Open the task form with the current task data pre-filled
    openTaskForm();
    document.getElementById('taskName').value = task.taskName;
    document.getElementById('description').value = task.description;
    document.getElementById('dueDate').value = task.dueDate;
    document.getElementById('priority').value = task.priority;

    // Replace the save button functionality to update the existing task
    const saveTaskBtn = document.getElementById('saveTaskBtn');
    saveTaskBtn.removeEventListener('click', handleTaskSubmission); // Remove previous event
    saveTaskBtn.addEventListener('click', () => {
        task.taskName = document.getElementById('taskName').value;
        task.description = document.getElementById('description').value;
        task.dueDate = document.getElementById('dueDate').value;
        task.priority = document.getElementById('priority').value;

        tasks[index] = task;
        localStorage.setItem('tasks', JSON.stringify(tasks));  // Update localStorage
        closeTaskForm();
        displayContent();  // Refresh the content display
    });
}

// Function to handle deleting projects
function deleteProject(event) {
    const index = event.target.dataset.index;
    let projects = getProjects();
    projects.splice(index, 1);  // Remove the project from the array
    localStorage.setItem('projects', JSON.stringify(projects));  // Update localStorage
    displayContent();  // Refresh the content display
}

// Function to handle editing projects
function editProject(event) {
    const index = event.target.dataset.index;
    let projects = getProjects();
    const project = projects[index];
    
    // Open the project form with the current project data pre-filled
    openProjectForm();
    document.getElementById('projectName').value = project.projectName;
    document.getElementById('projectDescription').value = project.description;
    document.getElementById('projectDueDate').value = project.dueDate;
    document.getElementById('projectPriority').value = project.priority;

    // Replace the save button functionality to update the existing project
    const saveProjectBtn = document.getElementById('saveProjectBtn');
    saveProjectBtn.removeEventListener('click', handleProjectSubmission); // Remove previous event
    saveProjectBtn.addEventListener('click', () => {
        project.projectName = document.getElementById('projectName').value;
        project.description = document.getElementById('projectDescription').value;
        project.dueDate = document.getElementById('projectDueDate').value;
        project.priority = document.getElementById('projectPriority').value;

        projects[index] = project;
        localStorage.setItem('projects', JSON.stringify(projects));  // Update localStorage
        closeProjectForm();
        displayContent();  // Refresh the content display
    });
}

// Combined Priority Color Function
function getPriorityColor(priority) {
    switch (priority) {
        case 'high': return 'red';
        case 'medium': return 'orange';
        case 'low': return 'green';
        default: return 'gray';
    }
}
