
// const tasks = [
//     { id: 1, title: "Task 1", description: "Description 1", priority: "High", dueDate: "2021-01-01", completed: false },
//     { id: 2, title: "Task 2", description: "Description 2", priority: "High", dueDate: "2021-01-01", completed: true },
//     { id: 3, title: "Task 3", description: "Description 3", priority: "High", dueDate: "2021-01-01", completed: false },
// ];

// function genTaskCard(task) {
//     const title = document.createElement("h3");
//     const desc = document.createElement("p");
//     const dueDate = document.createElement("p");
//     const priority = document.createElement("p");
//     const completed = document.createElement("input");
//     const editBtn = document.createElement("button");
//     const deleteBtn = document.createElement("button");

//     title.innerHTML = `Title: ${task.title}`;
//     desc.innerHTML = `Description: ${task.description}`;
//     dueDate.innerHTML = `Due Date: ${task.dueDate}`;
//     priority.innerHTML = `Priority: ${task.priority}`;
//     completed.type = "checkbox";
//     completed.checked = `Completed: ${task.completed}`;
//     editBtn.innerHTML = "Edit";
//     editBtn.id = "editBtn";
//     deleteBtn.innerHTML = "Delete";
//     deleteBtn.id = "deleteBtn";

//     const taskCard = document.createElement("div");
//     taskCard.classList.add("card");
//     taskCard.appendChild(title);
//     taskCard.appendChild(desc);
//     taskCard.appendChild(dueDate);
//     taskCard.appendChild(priority);
//     taskCard.appendChild(completed);
//     taskCard.appendChild(editBtn);
//     taskCard.appendChild(deleteBtn);

//     return taskCard;
// }

// export default function Tasks() {
//     // Parent container
//     const contentPage = document.querySelector('#content-page');
//     contentPage.innerHTML = '';

//     // Title
//     const contentTitle = document.createElement('div');
//     contentTitle.id = 'content-title';
//     contentTitle.innerHTML = "Tasks";
//     contentTitle.classList.add('bg-rose-500');

//     // Header
//     const contentHeader = document.createElement('div');
//     contentHeader.id = 'content-header';
//     contentHeader.classList.add('flex', 'gap-2', 'h-auto', 'bg-rose-200');

//     // Header elements
//     const h3folder = document.createElement('h3');
//     const h3taskCount = document.createElement('h3');
//     const addBtn = document.createElement('button');
//     h3folder.innerHTML = "Folder Name";
//     h3folder.classList.add("bg-black", "text-white", "w-1/2", "text-center", "p-4", "shadow-md", "rounded-md", "mb-4");
//     h3taskCount.innerHTML = `${tasks.length} tasks`;
//     h3taskCount.classList.add("bg-black", "text-white", "p-4", "shadow-md", "rounded-md", "mb-4");
//     addBtn.innerHTML = "Add New +";
//     addBtn.id = 'addBtn';
//     addBtn.classList.add("bg-black", "text-white", "p-4", "shadow-md", "rounded-md", "mb-4");

//     contentHeader.appendChild(h3folder);
//     contentHeader.appendChild(h3taskCount);
//     contentHeader.appendChild(addBtn);

//     // Card body
//     const contentBody = document.createElement('div');
//     contentBody.id = "content-body";
//     contentBody.classList.add('bg-rose-800', 'shadow-md', 'rounded-md');

//     tasks.forEach(task => {
//         const taskCard = genTaskCard(task);
//         contentBody.appendChild(taskCard);
//     });

//     // Append to parent
//     contentPage.appendChild(contentTitle);
//     contentPage.appendChild(contentHeader);
//     contentPage.appendChild(contentBody);
// }

import '../style.css';

let tasks = [];

export function setTasks(newTasks) {
    tasks = newTasks;
}

function genTaskCard(task) {
    const taskCard = document.createElement('div');
    taskCard.classList.add("card");

    const title = document.createElement("h3");
    const desc = document.createElement("p");
    const dueDate = document.createElement("p");
    const priority = document.createElement("p");
    const completed = document.createElement("input");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    title.innerHTML = `Title: ${task.title}`;
    desc.innerHTML = `Description: ${task.description}`;
    dueDate.innerHTML = `Due Date: ${task.dueDate}`;
    priority.innerHTML = `Priority: ${task.priority}`;
    completed.type = 'checkbox';
    completed.checked = `Completed: ${task.completed}`;
    editBtn.innerHTML = "Edit";
    deleteBtn.innerHTML = "Delete";

    taskCard.appendChild(title);
    taskCard.appendChild(desc);
    taskCard.appendChild(dueDate);
    taskCard.appendChild(priority);
    taskCard.appendChild(completed);
    taskCard.appendChild(editBtn);
    taskCard.appendChild(deleteBtn);

    return taskCard;
}

export default function Tasks(folder) {
    const contentPage = document.querySelector('#content-page');
    contentPage.innerHTML = '';

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
    h3taskCount.innerHTML = `${tasks.filter(task => task.folder === folder).length} tasks`;
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
    contentBody.id = "content-body";
    contentBody.classList.add('bg-rose-800', 'shadow-md', 'rounded-md');

    tasks.filter(task => task.folder === folder).forEach(task => {
        const taskCard = genTaskCard(task);
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
        const newTask = {
            id: tasks.length + 1,
            title: titleInput.value,
            description: descInput.value,
            priority: prioritySelect.value,
            dueDate: dueDateInput.value,
            completed: false,
            folder: folder
        };
        tasks.push(newTask);
        setTasks(tasks);
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
        dialog.close();
    });

    return dialog;
}

