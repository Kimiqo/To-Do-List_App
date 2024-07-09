import { genTaskCard } from './tasks.js';   

let tasks = [];

export function Settasks(newTasks) {
    tasks = newTasks;
}

export default function HighPriority() {
    const contentPage = document.querySelector('#content-page');
    contentPage.innerHTML = '';

    const contentTitle = document.createElement('div');
    const contentBody = document.createElement('div');

    contentTitle.id = 'content-title-hp';
    contentTitle.classList.add('bg-rose-500');
    contentTitle.innerHTML = "High Priority Tasks";

    contentBody.id = 'content-body-hp';

    contentPage.appendChild(contentTitle);
    contentPage.appendChild(contentBody);

    const highPriorityTasks = getHighPriorityTasks();
    highPriorityTasks.forEach(task => {
        contentBody.appendChild(genTaskCard(task));
    });
}

export function getHighPriorityTasks() {
    return tasks.filter(task => task.priority === 'High');
}