import './style.css'
import Home from './components/home.js';
import HighPriority, { getHighPriorityTasks, Settasks } from './components/highPriority.js'
import Folders from './components/folders.js'
import Tasks, { setTasks } from './components/tasks.js'
import { initializeAppState, useAppState, removeFolder } from './components/appState.js'

// Start with empty tasks and folders
let folders = [];
let tasks = [];

// Initialize app state
initializeAppState(tasks, folders);

setTasks(tasks);
Settasks(tasks);

const app = document.querySelector('#app');
const contentPage = document.querySelector('#content-page');
const homeLink = document.getElementById('home');
const highPriorityLink = document.querySelector('#high-priority');
const foldersLink = document.querySelector('#folders');
const subfolderLink = document.getElementById('subFolders');

function renderSidebar() {
    const sidebar = document.querySelector('#subFolders');
    sidebar.innerHTML = '';

    const { folders } = useAppState();

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
            if (confirm(`Are you sure you want to delete folder "${folder}"?`)) {
                removeFolder(folder);
                renderSidebar();
                Folders(useAppState().folders);
                Home(); // Re-render home page to update stats
            }
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
            Folders(useAppState().folders);
        }
    });
    sidebar.appendChild(addFolderBtn);
}

renderSidebar();

homeLink.addEventListener('click', () => {
    subfolderLink.classList.add("showNot");
    homeLink.classList.add("active");
    highPriorityLink.classList.remove("active");
    foldersLink.classList.remove("active");
    Home();
});

highPriorityLink.addEventListener('click', () => {
    subfolderLink.classList.add("showNot");
    homeLink.classList.remove("active");
    highPriorityLink.classList.add("active");
    foldersLink.classList.remove("active");
    HighPriority();
    const high = getHighPriorityTasks();
    console.log(high);
});

foldersLink.addEventListener('click', () => {
    subfolderLink.classList.remove("showNot");
    homeLink.classList.remove("active");
    highPriorityLink.classList.remove("active");
    foldersLink.classList.add("active");
    Folders(useAppState().folders);
});

// Ensure Home is called when the page loads
document.addEventListener('DOMContentLoaded', () => {
    Home();
});
