const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const clearCompletedButton = document.getElementById('clearCompleted');

document.addEventListener('DOMContentLoaded', loadTasks);
addTaskButton.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const task = {
            text: taskText,
            completed: false,
            date: new Date().toLocaleDateString()
        };
        createTaskElement(task);
        saveTaskToLocalStorage(task);
        taskInput.value = '';
    }
}

function createTaskElement(task) {
    const taskItem = document.createElement('li');

    const taskContent = document.createElement('div');
    taskContent.classList.add('task-content');

    const taskDateSpan = document.createElement('span');
    taskDateSpan.textContent = task.date;
    taskDateSpan.classList.add('task-date');

    const taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = task.text;
    taskTextSpan.classList.add('task-text');
    if (task.completed) {
        taskTextSpan.classList.add('completed');
    }

    taskContent.appendChild(taskDateSpan);
    taskContent.appendChild(taskTextSpan);

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Completed';
    completeButton.classList.add('complete-btn');
    completeButton.addEventListener('click', () => {
        taskTextSpan.classList.toggle('completed');
        updateTaskStatusInLocalStorage(task.text);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(taskItem);
        removeTaskFromLocalStorage(task.text);
    });

    taskItem.appendChild(taskContent);
    taskItem.appendChild(completeButton);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
}

function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => createTaskElement(task));
}

function updateTaskStatusInLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.text === taskText) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

clearCompletedButton.addEventListener('click', () => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => !task.completed);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const taskItems = taskList.querySelectorAll('li');
    taskItems.forEach(taskItem => {
        if (taskItem.querySelector('.task-text').classList.contains('completed')) {
            taskList.removeChild(taskItem);
        }
    });
});
