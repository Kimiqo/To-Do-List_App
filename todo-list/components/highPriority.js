export default function HighPriority() {
    const contentPage = document.querySelector('#content-page');
    contentPage.innerHTML = '';

    const contentTitle = document.createElement('div');
    const contentBody = document.createElement('div');

    contentTitle.id = 'content-title-hp';
    contentTitle.classList.add('bg-rose-500');
    contentTitle.innerHTML = "High Priority Tasks";

    contentBody.id = 'content-body-hp';
    contentBody.classList.add('bg-rose-800', 'shadow-md', 'rounded-md');

    contentPage.appendChild(contentTitle);
    contentPage.appendChild(contentBody);
}