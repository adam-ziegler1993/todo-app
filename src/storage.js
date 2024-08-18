export function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

export function saveProject(project) {
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));
}

export function getProjects() {
    return JSON.parse(localStorage.getItem('projects')) || [];
}
