import { useAppState, removeTask, updateTask } from './appState.js';

export function setTasks(newTasks) {
    useAppState().updateTasks(newTasks);
}

export function genTaskCard(task, folder) {
    const card = document.createElement('div');
    card.classList.add('bg-white', 'p-4', 'rounded-lg', 'flex', 'justify-between', 'items-center', 'shadow-sm', 'mb-2');

    const taskInfoContainer = document.createElement('div');
    taskInfoContainer.classList.add('flex', 'items-center', 'space-x-4', 'w-full');

    // Completed Checkbox
    const completedCheckbox = document.createElement('input');
    completedCheckbox.type = 'checkbox';
    completedCheckbox.checked = task.completed;
    completedCheckbox.classList.add('form-checkbox', 'h-5', 'w-5', 'text-blue-600');
    completedCheckbox.addEventListener('change', () => {
        updateTask(task.id, { completed: completedCheckbox.checked });
        Tasks(folder); // Re-render the page for the current folder
    });

    // Task Info
    const taskInfo = document.createElement('div');
    taskInfo.classList.add('flex-grow');
    taskInfo.innerHTML = `
        <h3 class="font-semibold text-gray-800 ${task.completed ? 'line-through' : ''}">${task.title}</h3>
        <p class="text-sm text-gray-600">${task.description || 'No description'}</p>
        <div class="flex items-center space-x-2 mt-1">
            <span class="text-xs ${getPriorityColor(task.priority)}">${task.priority} Priority</span>
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
        const contentPage = document.querySelector('#content-page');
        contentPage.appendChild(createEditTaskForm(task, folder));
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('bg-red-500', 'text-white', 'px-2', 'py-1', 'rounded', 'text-sm');
    deleteBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this task?')) {
            removeTask(task.id);
            Tasks(folder); // Re-render the page for the current folder
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

export default function Tasks(folder) {
    const contentPage = document.querySelector('#content-page');
    contentPage.innerHTML = '';

    // Get tasks from app state
    const { tasks } = useAppState();

    const contentTitle = document.createElement('div');
    contentTitle.id = 'content-title';
    contentTitle.innerHTML = `Tasks in ${folder}`;
    contentTitle.classList.add('bg-rose-500');

    const contentHeader = document.createElement('div');
    contentHeader.id = 'content-header';
    contentHeader.classList.add('flex', 'gap-2', 'h-auto', 'bg-rose-200');

    const h3folder = document.createElement('h3');
    const h3taskCount = document.createElement('h3');
    const addBtn = document.createElement('button');
    h3folder.innerHTML = folder;
    h3folder.classList.add("bg-black", "text-white", "w-1/2", "text-center", "p-4", "shadow-md", "rounded-md", "mb-4");
    
    // Use filtered tasks from app state
    const folderTasks = tasks.filter(task => task.folder === folder);
    h3taskCount.innerHTML = `${folderTasks.length} tasks`;
    h3taskCount.classList.add("bg-black", "text-white", "p-4", "shadow-md", "rounded-md", "mb-4");
    
    addBtn.innerHTML = "Add New +";
    addBtn.classList.add("bg-black", "text-white", "p-4", "shadow-md", "rounded-md", "mb-4");
    addBtn.addEventListener('click', () => {
        contentPage.appendChild(createTaskForm(folder));
    });

    contentHeader.appendChild(h3folder);
    contentHeader.appendChild(h3taskCount);
    contentHeader.appendChild(addBtn);

    const contentBody = document.createElement('div');
    contentBody.id = "content-body-tasks";

    // Use filtered tasks from app state
    folderTasks.forEach(task => {
        const taskCard = genTaskCard(task, folder);
        contentBody.appendChild(taskCard);
    });

    contentPage.appendChild(contentTitle);
    contentPage.appendChild(contentHeader);
    contentPage.appendChild(contentBody);
}

function createTaskForm(folder) {
    const form = document.createElement('form');
    const dialog = document.createElement('dialog');
    dialog.classList.add('bg-rose-800', 'shadow-md', 'rounded-md', 'p-4');

    const titleInput = document.createElement('input');
    titleInput.placeholder = 'Task Title';
    titleInput.classList.add('block', 'p-2', 'mb-2', 'border', 'border-gray-300', 'rounded-md');
    form.appendChild(titleInput);

    const descInput = document.createElement('input');
    descInput.placeholder = 'Task Description';
    descInput.classList.add('block', 'p-2', 'mb-2', 'border', 'border-gray-300', 'rounded-md');
    form.appendChild(descInput);

    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.classList.add('block', 'p-2', 'mb-2', 'border', 'border-gray-300', 'rounded-md');
    form.appendChild(dueDateInput);

    const prioritySelect = document.createElement('select');
    const priorities = ['High', 'Medium', 'Low'];
    priorities.forEach(priority => {
        const option = document.createElement('option');
        option.value = priority;
        option.innerHTML = priority;
        prioritySelect.appendChild(option);
    });
    prioritySelect.classList.add('block', 'p-2', 'mb-2', 'border', 'border-gray-300', 'rounded-md');
    form.appendChild(prioritySelect);

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.innerHTML = 'Add Task';
    submitBtn.classList.add('bg-black', 'text-white', 'p-2', 'rounded-md', 'mt-2');
    form.appendChild(submitBtn);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!titleInput.value || !descInput.value || !dueDateInput.value) {
            alert('All fields are required!');
            return;
        }

        const { tasks } = useAppState();
        const newTask = {
            id: Date.now(),
            title: titleInput.value,
            description: descInput.value,
            priority: prioritySelect.value,
            dueDate: dueDateInput.value,
            completed: false,
            folder: folder
        };

        useAppState().updateTasks([...tasks, newTask]);
        Tasks(folder);
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

function createEditTaskForm(task, folder) {
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
        if (!titleInput.value || !descInput.value || !dueDateInput.value) {
            alert('All fields are required!');
            return;
        }

        const updatedTask = {
            title: titleInput.value,
            description: descInput.value,
            priority: prioritySelect.value,
            dueDate: dueDateInput.value,
            completed: completedCheckbox.checked,
            folder: folder
        };

        updateTask(task.id, updatedTask);
        Tasks(folder);
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

function getPriorityColor(priority) {
    switch(priority.toLowerCase()) {
        case 'high': return 'text-red-600';
        case 'medium': return 'text-yellow-600';
        case 'low': return 'text-green-600';
        default: return 'text-gray-600';
    }
}
