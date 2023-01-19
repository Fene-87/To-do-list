import Store from "./store";
import StatusUpdate from "./statusUpdate";

export default class AddDelete {
    static displayTasks = () => {
        const taskList = Store.getLocalStorage();
        taskList.forEach((task) => AddDelete.addTask(task));
    }

    static addTask = (task) => {
        const list = document.querySelector('.tasked-list');
        const row = document.createElement('div');
        row.classList.add('task-row');
        row.innerHTML = `
          <div class="task-element">
            <div class="task-description">
              <input type="checkbox" class="task-complete"/> 
              <input type="text" class="task-text" value="${task.description}" />
            </div> 
            <div class="task-icon"><i class="fa-solid fa-ellipsis-vertical delete"></i></div>
          </div>
        `;

        list.appendChild(row);
        StatusUpdate.updateAllCheckbox();
    }

    static editTask = () => {
      const tasksList = Store.getLocalStorage();
      const editField = document.querySelectorAll('.task-text');
      editField.forEach((field, index) => {
        tasksList[index].description = field.value;
      })

      localStorage.setItem('tasks', JSON.stringify(tasksList));
    }

    static removeTask = () => {
        const tasksList = Store.getLocalStorage();
        const completeTasks = document.querySelectorAll('.task-complete');
        completeTasks.forEach((completeTask, index) => {
          if(completeTask.checked) {
            completeTask.parentElement.parentElement.parentElement.remove();
            tasksList[index].completed = true;
          }
        })

        localStorage.setItem('tasks', JSON.stringify(tasksList));
    }

    static clearFields = () => {
        document.querySelector('.book-input').value = '';
    }
}