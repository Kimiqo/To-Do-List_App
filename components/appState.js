// Centralized state management for the application

let appState = {
    tasks: [],
    folders: []
};

export function initializeAppState(initialTasks = [], initialFolders = []) {
    // Try to load from localStorage first
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const storedFolders = JSON.parse(localStorage.getItem('folders') || '[]');

    // Use stored data if available, otherwise use initial data
    appState.tasks = storedTasks.length > 0 ? storedTasks : initialTasks;
    appState.folders = storedFolders.length > 0 ? storedFolders : initialFolders;

    // Ensure localStorage is updated
    localStorage.setItem('tasks', JSON.stringify(appState.tasks));
    localStorage.setItem('folders', JSON.stringify(appState.folders));
}

export function useAppState() {
    return {
        tasks: appState.tasks,
        folders: appState.folders,
        updateTasks: (newTasks) => {
            appState.tasks = newTasks;
            localStorage.setItem('tasks', JSON.stringify(newTasks));
        },
        updateFolders: (newFolders) => {
            appState.folders = newFolders;
            localStorage.setItem('folders', JSON.stringify(newFolders));
        }
    };
}

export function addTask(task) {
    const { tasks } = useAppState();
    const updatedTasks = [...tasks, task];
    useAppState().updateTasks(updatedTasks);
}

export function removeTask(taskId) {
    const { tasks } = useAppState();
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    useAppState().updateTasks(updatedTasks);
}

export function updateTask(taskId, updatedTask) {
    const { tasks } = useAppState();
    const updatedTasks = tasks.map(task => 
        task.id === taskId ? { ...task, ...updatedTask } : task
    );
    useAppState().updateTasks(updatedTasks);
}

export function addFolder(folderName) {
    const { folders } = useAppState();
    if (!folders.includes(folderName)) {
        const updatedFolders = [...folders, folderName];
        useAppState().updateFolders(updatedFolders);
    }
}

export function removeFolder(folderName) {
    const { folders, tasks } = useAppState();
    const updatedFolders = folders.filter(f => f !== folderName);
    const updatedTasks = tasks.filter(t => t.folder !== folderName);
    
    useAppState().updateFolders(updatedFolders);
    useAppState().updateTasks(updatedTasks);
}
