// import './style.css';
// import Home from './components/home.js';
// import HighPriority from './components/highPriority.js';
// import Folders from './components/folders.js';
// import Tasks from './components/tasks.js';

// const contentPage = document.querySelector('#content-page');
// const homeLink = document.querySelector('#home');
// const highPriorityLink = document.querySelector('#high-priority');
// const foldersLink = document.querySelector('#folders');
// const subfolderLink = document.getElementById('subFolders');
// const subsubFolder = document.getElementById('sub-folder');

// homeLink.addEventListener('click', () => {
//   subfolderLink.classList.add("showNot");
//   highPriorityLink.classList.remove("active");
//   homeLink.classList.add("active");
//   foldersLink.classList.remove("active");
//   contentPage.innerHTML = '';
//   Home();
// });

// highPriorityLink.addEventListener('click', () => {
//   subfolderLink.classList.add("showNot");
//   homeLink.classList.remove("active");
//   highPriorityLink.classList.add("active");
//   foldersLink.classList.remove("active");
//   contentPage.innerHTML = '';
//   HighPriority();
// });

// foldersLink.addEventListener('click', () => {
//   subfolderLink.classList.remove("showNot");
//   homeLink.classList.remove("active");
//   highPriorityLink.classList.remove("active");
//   foldersLink.classList.add("active");
//   contentPage.innerHTML = '';
//   Folders();
// });

// subsubFolder.addEventListener('click', () => {
//   contentPage.style.backgroundColor = 'white';
//   homeLink.classList.remove("active");
//   highPriorityLink.classList.remove("active");
//   foldersLink.classList.add("active");
//   contentPage.innerHTML = '';
//   Tasks();
// });

import './style.css'
import Home from './components/home.js'
import HighPriority from './components/highPriority.js'
import Folders from './components/folders.js'
import Tasks, { setTasks } from './components/tasks.js'

let folders = ['Folder 1', 'Folder 2'];
let tasks = [
    { id: 1, title: "Task 1", description: "Description 1", priority: "High", dueDate: "2021-01-01", completed: false, folder: 'Folder 1' },
    { id: 2, title: "Task 2", description: "Description 2", priority: "Medium", dueDate: "2021-02-01", completed: true, folder: 'Folder 1' },
    { id: 3, title: "Task 3", description: "Description 3", priority: "Low", dueDate: "2021-03-01", completed: false, folder: 'Folder 2' },
    { id: 4, title: "Task 4", description: "Description 4", priority: "High", dueDate: "2021-04-01", completed: true, folder: 'Folder 2' }
];

setTasks(tasks);

const app = document.querySelector('#app');
const contentPage = document.querySelector('#content-page');
const homeLink = document.querySelector('#home');
const highPriorityLink = document.querySelector('#high-priority');
const foldersLink = document.querySelector('#folders');
const subfolderLink = document.getElementById('subFolders');

function renderSidebar() {
    const sidebar = document.querySelector('#subFolders');
    sidebar.innerHTML = '';

    folders.forEach(folder => {
        const folderElement = document.createElement('div');
        folderElement.classList.add('grid', 'justify-between', 'items-center');

        const folderLink = document.createElement('a');
        folderLink.id = `folder`;
        folderLink.innerHTML = folder;
        folderLink.classList.add('block', 'text-white', 'p-4', 'hover:bg-whitesmoke', 'hover:text-red');
        folderLink.addEventListener('click', () => {
            Tasks(folder);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'Delete';
        deleteBtn.classList.add('text-red-500', 'ml-2');
        deleteBtn.addEventListener('click', () => {
            folders = folders.filter(f => f !== folder);
            tasks = tasks.filter(t => t.folder !== folder);
            setTasks(tasks); // Update tasks in tasks.js
            renderSidebar();
            Folders(folders);
        });

        folderElement.appendChild(folderLink);
        folderElement.appendChild(deleteBtn);
        sidebar.appendChild(folderElement);
    });

    const addFolderBtn = document.createElement('button');
    addFolderBtn.innerHTML = 'Add Folder';
    addFolderBtn.id = 'addFolderBtn';
    addFolderBtn.addEventListener('click', () => {
        const folderName = prompt('Enter folder name:');
        if (folderName) {
            folders.push(folderName);
            renderSidebar();
            Folders(folders);
        }
    });
    sidebar.appendChild(addFolderBtn);
}

renderSidebar();

homeLink.addEventListener('click', () => {
    subfolderLink.classList.add("showNot");
    highPriorityLink.classList.remove("active");
    homeLink.classList.add("active");
    foldersLink.classList.remove("active");
    Home();
});

highPriorityLink.addEventListener('click', () => {
    subfolderLink.classList.add("showNot");
    homeLink.classList.remove("active");
    highPriorityLink.classList.add("active");
    foldersLink.classList.remove("active");
    HighPriority();
});

foldersLink.addEventListener('click', () => {
    subfolderLink.classList.remove("showNot");
    homeLink.classList.remove("active");
    highPriorityLink.classList.remove("active");
    foldersLink.classList.add("active");
    Folders(folders);
});

