import Store from "./store";
import StatusUpdate from "./statusUpdate";
import TaskObject from "./taskObj";

export default class AddDelete {
    static displayTasks = () => {
        const taskList = Store.getLocalStorage();
        taskList.forEach((task) => AddDelete.addTask(task));
    }

    static newTask = () => {
       const description = document.querySelector('.book-input').value;
        const id = Store.getLocalStorage().length + 1;
        const completed = false;

        const task = new TaskObject(description, id, completed);
        AddDelete.addTask(task);
        Store.addLocalStorage(task);

        const updateComplete = StatusUpdate.updateAllCheckbox();
        updateComplete.forEach((box, index) => {
        box.addEventListener('change', () => {
        StatusUpdate.completedCheckbox();
        console.log(updateComplete);
        })
      })
    }

    static addTask = (task) => {
        const list = document.querySelector('.tasked-list');
        const row = document.createElement('div');
        row.classList.add('task-row');
        row.innerHTML = `
          <div class="task-element">
            <div class="task-description">
              <input type="checkbox" class="task-complete" autocomplete="off"/> 
              <input type="text" class="task-text" value="${task.description}" />
            </div> 
            <div class="task-icon"><i class="fa-solid fa-ellipsis-vertical delete"></i></div>
          </div>
        `;

        list.appendChild(row);
        StatusUpdate.updateAllCheckbox();
        console.log(list.childElementCount);
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

    static deleteTaskIcon = () => {
      const deleteTask = document.querySelectorAll('.delete');
      const tasksDeleteList = Store.getLocalStorage();
      deleteTask.forEach((deletedTask, index) => {
      deletedTask.addEventListener('click', () => {
        deletedTask.parentElement.parentElement.parentElement.remove();
        tasksDeleteList[index].completed = true;
        localStorage.setItem('tasks', JSON.stringify(tasksDeleteList));
        console.log('deleted')

        Store.removeLocalStorage(tasksDeleteList);
      })
    })
    }

    static persistCheckbox = () => {
      const allCheckboxes = document.querySelectorAll('.task-complete');
      const store = Store.getLocalStorage();

      allCheckboxes.forEach((box, index) => {
        if(store[index].completed === true){
          box.checked = true;
        }
      })
    }

    static clearFields = () => {
        document.querySelector('.book-input').value = '';
    }
}