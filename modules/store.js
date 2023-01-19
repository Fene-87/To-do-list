export default class Store {
    static getLocalStorage = () => {
        let taskList;
        if(localStorage.getItem('tasks') === null) {
            taskList = [];
        } else {
            taskList = JSON.parse(localStorage.getItem('tasks'));
        }

        return taskList;
    }

    static addLocalStorage = (task) => {
        const listOfTasks = Store.getLocalStorage();
        listOfTasks.push(task);

        localStorage.setItem('tasks', JSON.stringify(listOfTasks));
    }

    static removeLocalStorage = () => {
        const tasksList = Store.getLocalStorage()
        const newTasksList = tasksList.filter((task) => task.completed === false)

        newTasksList.forEach((item, index) => {
            item.id = index + 1;
        })
        localStorage.setItem('tasks', JSON.stringify(newTasksList));
    }
}
