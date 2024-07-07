const tasks = [
    { id: 1, title: "Task 1", description: "Description 1", priority: "High", dueDate: "2021-01-01", completed: false },
    { id: 2, title: "Task 2", description: "Description 2", priority: "High", dueDate: "2021-01-01", completed: true },
    { id: 3, title: "Task 3", description: "Description 3", priority: "High", dueDate: "2021-01-01", completed: false },
];

function genTaskCard(tasks) {
    const title = document.createElement("h3");
    const desc = document.createElement("p");
    const dueDate = document.createElement("p");
    const priority = document.createElement("p");
    const completed = document.createElement("input");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    title.innerHTML = tasks[index].title;
    desc.innerHTML = tasks[index].description;
    dueDate.innerHTML = tasks[index].dueDate;
    priority.innerHTML = tasks[index].priority;
    completed.innerHTML = `Completed: ${tasks[index].completed}`;
    editBtn.innerHTML = "Edit";
    deleteBtn.innerHTML = "Delete";

    const taskCard = document.createElement("div");
    taskCard.classList.add("card");
    taskCard.appendChild(title);
    taskCard.appendChild(desc);
    taskCard.appendChild(dueDate);
    taskCard.appendChild(priority);
    taskCard.appendChild(completed);
    taskCard.appendChild(editBtn);
    taskCard.appendChild(deleteBtn);

    return taskCard;
}

export default function Tasks() {
    //parent container
    const contentPage = document.querySelector('#content-page');
    contentPage.innerHTML = '';

    //title
    const contentTitle = document.createElement('div');
    contentTitle.id = 'content-title';
    contentTitle.innerHTML = "Tasks";
    contentTitle.classList.add('bg-rose-500');
    //append to parent 
    contentPage.appendChild(contentTitle);

    //header
    const contentHeader = document.createElement('div');
    contentHeader.id = 'content-header';
    contentHeader.classList.add('flex gap-2 h-auto bg-rose-200');
    contentHeader.innerHTML = `
    <h3 id="folder-name" class="bg-black text-white w-50 text-center p-4 shadow-md rounded-md mb-4" >Folder Name</h3>
    <h3 id="task-count" class="bg-black text-white p-4 shadow-md rounded-md mb-4">"X" tasks</h3>
    <button id="addBtn" class="bg-black text-white p-4 shadow-md rounded-md mb-4">Add New + </button>
    `;
    //append to parent
    contentPage.appendChild(contentHeader);

    //card body
    const contentBody = document.createElement('div');
    contentBody.id = 'content-body';
    contentBody.classList.add('bg-rose-800 shadow-md rounded-md');
    //append to parent
    contentPage.appendChild(contentBody);

    for (let index = 0; index < tasks.length; index++) {
        genTaskCard(tasks[index]);
    }
}





    `
<h2 id="content-title">Sample Title</h2>
`


