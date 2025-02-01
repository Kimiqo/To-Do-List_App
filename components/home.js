import { getHighPriorityTasks } from './highPriority.js';
import { useAppState, removeTask, updateTask } from './appState.js';

export default function Home() {
    const contentPage = document.querySelector('#content-page');
    contentPage.innerHTML = '';
    
    // Get current app state
    const { tasks } = useAppState();

    // Create main container
    const homeContainer = document.createElement('div');
    homeContainer.classList.add('p-6', 'bg-white', 'rounded-lg', 'shadow-md');

    // Title
    const titleSection = document.createElement('div');
    titleSection.classList.add('mb-6', 'text-center');
    const title = document.createElement('h1');
    title.classList.add('text-3xl', 'font-bold', 'text-green-600');
    title.textContent = 'Welcome to Your Task Manager';
    titleSection.appendChild(title);

    // Quick Stats Section
    const statsSection = document.createElement('div');
    statsSection.classList.add('grid', 'grid-cols-3', 'gap-4', 'mb-6');

    // Total Tasks
    const totalTasksCard = createStatCard('Total Tasks', tasks.length, 'bg-blue-100', 'text-blue-600');
    
    // Completed Tasks
    const completedTasksCard = createStatCard('Completed Tasks', tasks.filter(task => task.completed).length, 'bg-green-100', 'text-green-600');
    
    // High Priority Tasks
    const highPriorityCard = createStatCard('High Priority', getHighPriorityTasks().length, 'bg-red-100', 'text-red-600');

    statsSection.appendChild(totalTasksCard);
    statsSection.appendChild(completedTasksCard);
    statsSection.appendChild(highPriorityCard);

    // Tasks List Section
    const tasksSection = document.createElement('div');
    tasksSection.classList.add('mt-6');

    const tasksTitle = document.createElement('h2');
    tasksTitle.classList.add('text-2xl', 'font-semibold', 'mb-4', 'text-gray-700');
    tasksTitle.textContent = 'Recent Tasks';
    tasksSection.appendChild(tasksTitle);

    // Display recent tasks
    const recentTasks = tasks.slice(-5).reverse(); // Last 5 tasks
    recentTasks.forEach(task => {
        const taskCard = createTaskCard(task);
        tasksSection.appendChild(taskCard);
    });

    // Quick Actions Section
    const actionsSection = document.createElement('div');
    actionsSection.classList.add('grid', 'grid-cols-2', 'gap-4', 'mt-6');

    const createTaskBtn = createActionButton('Create New Task', 'bg-green-500', () => {
        // Implement task creation logic
        const newTask = {
            id: Date.now(),
            title: prompt('Enter task title:'),
            description: prompt('Enter task description:'),
            priority: prompt('Enter priority (Low/Medium/High):'),
            dueDate: prompt('Enter due date (YYYY-MM-DD):'),
            completed: false,
            folder: prompt('Enter folder name:') || 'Default'
        };

        if (newTask.title) {
            const { tasks } = useAppState();
            useAppState().updateTasks([...tasks, newTask]);
            Home(); // Re-render home page
        }
    });

    const viewFoldersBtn = createActionButton('Manage Folders', 'bg-blue-500', () => {
        document.getElementById('folders').click();
    });

    actionsSection.appendChild(createTaskBtn);
    actionsSection.appendChild(viewFoldersBtn);

    // Combine all sections
    homeContainer.appendChild(titleSection);
    homeContainer.appendChild(statsSection);
    homeContainer.appendChild(tasksSection);
    homeContainer.appendChild(actionsSection);

    contentPage.appendChild(homeContainer);
}

function createStatCard(title, value, bgColor, textColor) {
    const card = document.createElement('div');
    card.classList.add('p-4', 'rounded-lg', 'shadow-md', 'text-center', bgColor);

    const titleEl = document.createElement('p');
    titleEl.classList.add('text-sm', 'font-semibold', textColor);
    titleEl.textContent = title;

    const valueEl = document.createElement('h2');
    valueEl.classList.add('text-2xl', 'font-bold', textColor);
    valueEl.textContent = value;

    card.appendChild(titleEl);
    card.appendChild(valueEl);

    return card;
}

function createTaskCard(task) {
    const card = document.createElement('div');
    card.classList.add('bg-gray-100', 'p-4', 'rounded-lg', 'mb-2', 'flex', 'justify-between', 'items-center');

    const taskInfo = document.createElement('div');
    taskInfo.innerHTML = `
        <h3 class="font-semibold text-gray-800">${task.title}</h3>
        <p class="text-sm text-gray-600">${task.description || 'No description'}</p>
        <span class="text-xs ${getPriorityColor(task.priority)}">${task.priority} Priority</span>
    `;

    const actionButtons = document.createElement('div');
    actionButtons.classList.add('flex', 'gap-2');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('bg-blue-500', 'text-white', 'px-2', 'py-1', 'rounded', 'text-sm');
    editBtn.addEventListener('click', () => {
        const contentPage = document.querySelector('#content-page');
        contentPage.appendChild(createEditTaskForm(task));
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('bg-red-500', 'text-white', 'px-2', 'py-1', 'rounded', 'text-sm');
    deleteBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this task?')) {
            removeTask(task.id);
            Home(); // Re-render home page
        }
    });

    actionButtons.appendChild(editBtn);
    actionButtons.appendChild(deleteBtn);

    card.appendChild(taskInfo);
    card.appendChild(actionButtons);

    return card;
}

function getPriorityColor(priority) {
    switch(priority.toLowerCase()) {
        case 'high': return 'text-red-600';
        case 'medium': return 'text-yellow-600';
        case 'low': return 'text-green-600';
        default: return 'text-gray-600';
    }
}

function createActionButton(text, bgColor, onClick) {
    const button = document.createElement('button');
    button.classList.add('p-3', 'rounded-lg', 'text-white', 'font-bold', 'hover:opacity-90', 'transition', bgColor);
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
}

function createEditTaskForm(task) {
    const form = document.createElement('form');
    const dialog = document.createElement('dialog');
    dialog.classList.add('bg-rose-800', 'shadow-md', 'rounded-md', 'p-4');

    const titleInput = document.createElement('input');
    titleInput.placeholder = 'Task Title';
    titleInput.value = task.title;
    titleInput.classList.add('block', 'p-2', 'mb-2', 'border', 'border-gray-300', 'rounded-md');
    form.appendChild(titleInput);

    const descInput = document.createElement('input');
    descInput.placeholder = 'Task Description';
    descInput.value = task.description;
    descInput.classList.add('block', 'p-2', 'mb-2', 'border', 'border-gray-300', 'rounded-md');
    form.appendChild(descInput);

    const folderInput = document.createElement('input');
    folderInput.placeholder = 'Folder Name';
    folderInput.value = task.folder;
    folderInput.classList.add('block', 'p-2', 'mb-2', 'border', 'border-gray-300', 'rounded-md');
    form.appendChild(folderInput);

    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.value = task.dueDate;
    dueDateInput.classList.add('block', 'p-2', 'mb-2', 'border', 'border-gray-300', 'rounded-md');
    form.appendChild(dueDateInput);

    const prioritySelect = document.createElement('select');
    const priorities = ['High', 'Medium', 'Low'];
    priorities.forEach(priority => {
        const option = document.createElement('option');
        option.value = priority;
        option.innerHTML = priority;
        option.selected = task.priority === priority;
        prioritySelect.appendChild(option);
    });
    prioritySelect.classList.add('block', 'p-2', 'mb-2', 'border', 'border-gray-300', 'rounded-md');
    form.appendChild(prioritySelect);

    const completedCheckbox = document.createElement('input');
    completedCheckbox.type = 'checkbox';
    completedCheckbox.checked = task.completed;
    const completedLabel = document.createElement('label');
    completedLabel.appendChild(completedCheckbox);
    completedLabel.appendChild(document.createTextNode(' Completed'));
    completedLabel.classList.add('block', 'mb-2');
    form.appendChild(completedLabel);

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.innerHTML = 'Update Task';
    submitBtn.classList.add('bg-black', 'text-white', 'p-2', 'rounded-md', 'mt-2');
    form.appendChild(submitBtn);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!titleInput.value || !descInput.value || !folderInput.value || !dueDateInput.value) {
            alert('All fields are required!');
            return;
        }

        const updatedTask = {
            title: titleInput.value,
            description: descInput.value,
            folder: folderInput.value,
            priority: prioritySelect.value,
            dueDate: dueDateInput.value,
            completed: completedCheckbox.checked
        };

        updateTask(task.id, updatedTask);
        Home();
        dialog.close();
    });

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.innerHTML = 'Cancel';
    closeBtn.classList.add('bg-red-500', 'text-white', 'p-2', 'rounded-md', 'mt-2', 'ml-2');
    
    form.appendChild(closeBtn);

    dialog.appendChild(form);
    document.body.appendChild(dialog);
    dialog.showModal();
    closeBtn.addEventListener('click', () => {
        dialog.style.display = 'none';
    });

    return dialog;
}