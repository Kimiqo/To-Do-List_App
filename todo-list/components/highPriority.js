export default function HighPriority() {
    const contentPage = document.querySelector('#content-page');
    contentPage.innerHTML = '';

    const contentTitle = document.createElement('div');
    const contentHeader = document.createElement('div');
    const contentBody = document.createElement('div');

    contentTitle.id = 'content-title';
    contentTitle.classList.add('bg-rose-500');

    contentHeader.id = 'content-header';
    contentHeader.classList.add('flex', 'gap-2', 'h-auto', 'bg-rose-200');

    contentBody.id = 'content-body';
    contentBody.classList.add('bg-rose-800', 'shadow-md', 'rounded-md');

    contentPage.appendChild(contentTitle);
    contentPage.appendChild(contentHeader);
    contentPage.appendChild(contentBody);
}