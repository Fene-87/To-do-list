import Store from "./store";

export default class StatusUpdate {
    static updateAllCheckbox = () => {
        return document.querySelectorAll('.task-complete');
    }

    static completedCheckbox = () => {
        const updateComplete = document.querySelectorAll('.task-complete');
        const tasksList = Store.getLocalStorage();
        updateComplete.forEach((box, index) => {
        
        if(box.checked){
          tasksList[index].completed = true;
          localStorage.setItem('tasks', JSON.stringify(tasksList));
        } else {
          tasksList[index].completed = false;
          localStorage.setItem('tasks', JSON.stringify(tasksList));
        }
      
    })
    }
}