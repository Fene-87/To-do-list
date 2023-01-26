import _ from 'lodash';
import './style.css';
import TaskObject from '../modules/taskObj';
import AddDelete from '../modules/tasks';
import Store from '../modules/store';
import StatusUpdate from '../modules/statusUpdate';

function component() {
    document.addEventListener('DOMContentLoaded', AddDelete.displayTasks());

    document.querySelector('.book-input').addEventListener('keyup', (event) => {
      event.preventDefault();
      const enterText = document.querySelector('.book-input').value;
      if(event.keyCode === 13 && enterText !== '') {
        AddDelete.newTask();
        AddDelete.clearFields();
      }
      })
    
    const taskEdit = document.querySelectorAll('.task-text');
    taskEdit.forEach((task) => {
      task.addEventListener('keyup', (event) => {
        event.preventDefault();
        if(event.keyCode === 13) {
          AddDelete.editTask();
        }
      })
      
    });

    const updateComplete = StatusUpdate.updateAllCheckbox();
    updateComplete.forEach((box, index) => {
      box.addEventListener('change', () => {
        StatusUpdate.completedCheckbox();
        console.log(updateComplete);
      })
    })
    
    AddDelete.deleteTaskIcon();

    document.addEventListener('DOMContentLoaded', AddDelete.persistCheckbox());

    document.querySelector('.clear-button').addEventListener('click', (event) => {
      
      AddDelete.removeTask();
      const tasksList = Store.getLocalStorage();
      Store.removeLocalStorage(tasksList);
    })

  }
  
  window.onload = () => {
    component();
  }