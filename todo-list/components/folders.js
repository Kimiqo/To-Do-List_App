
export default function Folders(folders) {
    const contentPage = document.querySelector('#content-page');
    contentPage.innerHTML = '';

    const contentTitle = document.createElement('div');
    contentTitle.id = 'content-title';
    contentTitle.innerHTML = 'Folders';
    contentTitle.classList.add('bg-rose-500');

    const contentBody = document.createElement('div');
    contentBody.id = 'content-body-folder';
    contentBody.classList.add('bg-rose-800', 'shadow-md', 'rounded-md');

    folders.forEach(folder => {
        const folderElement = document.createElement('div');
        folderElement.innerHTML = folder;
        folderElement.id = 'foldersElem';
        folderElement.classList.add('folder-item', 'cursor-pointer', 'p-4', 'bg-green-200', 'rounded-md', 'm-2');
        folderElement.addEventListener('click', () => {
            Tasks(folder);
        });
        contentBody.appendChild(folderElement);
    });

    contentPage.appendChild(contentTitle);
    contentPage.appendChild(contentBody);
}
