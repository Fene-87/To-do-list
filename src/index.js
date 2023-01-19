import _ from 'lodash';
import './style.css';
import TaskObject from '../modules/taskObj';
import AddDelete from '../modules/tasks';
import Store from '../modules/store';

function component() {
    document.addEventListener('DOMContentLoaded', AddDelete.displayTasks());

    document.querySelector('.book-input').addEventListener('keyup', (event) => {
      event.preventDefault();
      const enterText = document.querySelector('.book-input').value;
      if(event.keyCode === 13 && enterText !== '') {
        const description = document.querySelector('.book-input').value;
        const id = Store.getLocalStorage().length + 1;
        const completed = false;

        const task = new TaskObject(description, id, completed);
        AddDelete.addTask(task);
        Store.addLocalStorage(task);
        AddDelete.clearFields();
      }
    });

    const taskEdit = document.querySelectorAll('.task-text');
    taskEdit.forEach((task) => {
      task.addEventListener('keyup', (event) => {
        event.preventDefault();
        if(event.keyCode === 13) {
          AddDelete.editTask();
        }
      })
      
    });

    document.querySelector('.clear-button').addEventListener('click', (event) => {
      
      AddDelete.removeTask();
      const tasksList = Store.getLocalStorage();
      Store.removeLocalStorage(tasksList);
    })

  }
  
  window.onload = () => {
    component();
  }