import { genTaskCard } from './tasks.js';   
import { useAppState, removeTask, updateTask } from './appState.js';
import Home from './home.js';

let tasks = [];

export function Settasks(newTasks) {
    tasks = newTasks;
}

export function getHighPriorityTasks() {
    const { tasks } = useAppState();
    return tasks.filter(task => task.priority.toLowerCase() === 'high');
}

export default function HighPriority() {
    const contentPage = document.querySelector('#content-page');
    contentPage.innerHTML = '';

    // Get high priority tasks
    const highPriorityTasks = getHighPriorityTasks();

    // Create main container
    const container = document.createElement('div');
    container.classList.add('p-6', 'bg-white', 'rounded-lg', 'shadow-md');

    // Title
    const title = document.createElement('h1');
    title.classList.add('text-3xl', 'font-bold', 'text-red-600', 'mb-6', 'text-center');
    title.textContent = 'High Priority Tasks';
    container.appendChild(title);

    // Tasks List
    if (highPriorityTasks.length === 0) {
        const noTasksMessage = document.createElement('p');
        noTasksMessage.classList.add('text-center', 'text-gray-500');
        noTasksMessage.textContent = 'No high priority tasks found.';
        container.appendChild(noTasksMessage);
    } else {
        const tasksList = document.createElement('div');
        tasksList.classList.add('space-y-4');

        highPriorityTasks.forEach(task => {
            const taskCard = createTaskCard(task);
            tasksList.appendChild(taskCard);
        });

        container.appendChild(tasksList);
    }

    contentPage.appendChild(container);
}

function createTaskCard(task) {
    const card = document.createElement('div');
    card.classList.add('bg-red-50', 'p-4', 'rounded-lg', 'flex', 'justify-between', 'items-center', 'shadow-sm');

    const taskInfoContainer = document.createElement('div');
    taskInfoContainer.classList.add('flex', 'items-center', 'space-x-4', 'w-full');

    // Completed Checkbox
    const completedCheckbox = document.createElement('input');
    completedCheckbox.type = 'checkbox';
    completedCheckbox.checked = task.completed;
    completedCheckbox.classList.add('form-checkbox', 'h-5', 'w-5', 'text-red-600');
    completedCheckbox.addEventListener('change', () => {
        updateTask(task.id, { completed: completedCheckbox.checked });
        HighPriority(); // Re-render the page
    });

    // Task Info
    const taskInfo = document.createElement('div');
    taskInfo.classList.add('flex-grow');
    taskInfo.innerHTML = `
        <h3 class="font-semibold text-gray-800 ${task.completed ? 'line-through' : ''}">${task.title}</h3>
        <p class="text-sm text-gray-600">${task.description || 'No description'}</p>
        <div class="flex items-center space-x-2 mt-1">
            <span class="text-xs text-red-600">High Priority</span>
            <span class="text-xs text-gray-500">${task.dueDate || 'No due date'}</span>
        </div>
    `;

    // Action Buttons
    const actionButtons = document.createElement('div');
    actionButtons.classList.add('flex', 'space-x-2');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('bg-blue-500', 'text-white', 'px-2', 'py-1', 'rounded', 'text-sm');
    editBtn.addEventListener('click', () => {
        const updatedTask = {
            title: prompt('Enter new task title:', task.title) || task.title,
            description: prompt('Enter new description:', task.description) || task.description,
            priority: 'High', // Always high priority in this screen
            dueDate: prompt('Enter new due date (YYYY-MM-DD):', task.dueDate) || task.dueDate,
            completed: task.completed
        };

        updateTask(task.id, updatedTask);
        HighPriority(); // Re-render the page
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('bg-red-500', 'text-white', 'px-2', 'py-1', 'rounded', 'text-sm');
    deleteBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this task?')) {
            removeTask(task.id);
            HighPriority(); // Re-render the page
        }
    });

    actionButtons.appendChild(editBtn);
    actionButtons.appendChild(deleteBtn);

    // Combine elements
    taskInfoContainer.appendChild(completedCheckbox);
    taskInfoContainer.appendChild(taskInfo);
    
    card.appendChild(taskInfoContainer);
    card.appendChild(actionButtons);

    return card;
}