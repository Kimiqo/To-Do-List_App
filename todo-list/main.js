import './style.css'
import Home from './components/home.js'
import HighPriority from './components/highPriority.js'
import Folders from './components/folders.js'
import Tasks from './components/tasks.js'


const app = document.querySelector('#app');
const contentPage = document.querySelector('#content-page');
const homeLink = document.querySelector('#home');
const highPriorityLink = document.querySelector('#high-priority');
const foldersLink = document.querySelector('#folders');
const subfolderLink = document.getElementById('subFolders');
const subsubFolder = document.getElementById('sub-folder');
// subfoldersLink.classList.add("showNot");

homeLink.addEventListener('click', () => {
  subfolderLink.classList.add("showNot");
  contentPage.style.backgroundColor = 'red';
  highPriorityLink.classList.remove("active");
  homeLink.classList.add("active");
  foldersLink.classList.remove("active");
  contentPage.innerHTML = Home();

});

highPriorityLink.addEventListener('click', () => {
  subfolderLink.classList.add("showNot");
  contentPage.style.backgroundColor = 'blue';
  homeLink.classList.remove("active");
  highPriorityLink.classList.add("active");
  foldersLink.classList.remove("active");
  contentPage.innerHTML = HighPriority();
});

foldersLink.addEventListener('click', () => {
  subfolderLink.classList.remove("showNot");
  console.log("removed");
  contentPage.style.backgroundColor = 'green';
  homeLink.classList.remove("active");
  highPriorityLink.classList.remove("active");
  foldersLink.classList.add("active");
  contentPage.innerHTML = Folders();
  
});

subsubFolder.addEventListener('click', () => {
    contentPage.style.backgroundColor = 'yellow';
    homeLink.classList.remove("active");
    highPriorityLink.classList.remove("active");
    foldersLink.classList.add("active");
    contentPage.innerHTML = Tasks();
});





