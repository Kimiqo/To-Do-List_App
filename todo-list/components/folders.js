// export default function Folders() {
//     const contentPage = document.querySelector('#content-page');
//     contentPage.innerHTML = '';

//     const contentTitle = document.createElement('div');
//     const contentHeader = document.createElement('div');
//     const contentBody = document.createElement('div');

//     contentTitle.id = 'content-title';
//     contentTitle.classList.add('bg-rose-500');

//     contentHeader.id = 'content-header';
//     contentHeader.classList.add('flex', 'gap-2', 'h-auto', 'bg-rose-200');

//     contentBody.id = 'content-body';
//     contentBody.classList.add('bg-rose-800', 'shadow-md', 'rounded-md');

//     contentPage.appendChild(contentTitle);
//     contentPage.appendChild(contentHeader);
//     contentPage.appendChild(contentBody);
// }

export default function Folders(folders) {
    const contentPage = document.querySelector('#content-page');
    contentPage.innerHTML = '';

    const contentTitle = document.createElement('div');
    contentTitle.id = 'content-title';
    contentTitle.innerHTML = 'Folders';
    contentTitle.classList.add('bg-rose-500');

    const contentBody = document.createElement('div');
    contentBody.id = 'content-body';
    contentBody.classList.add('bg-rose-800', 'shadow-md', 'rounded-md');

    folders.forEach(folder => {
        const folderElement = document.createElement('div');
        folderElement.innerHTML = folder;
        folderElement.classList.add('folder-item', 'cursor-pointer', 'p-4', 'bg-green-200', 'rounded-md', 'm-2');
        folderElement.addEventListener('click', () => {
            Tasks(folder);
        });
        contentBody.appendChild(folderElement);
    });

    contentPage.appendChild(contentTitle);
    contentPage.appendChild(contentBody);
}
