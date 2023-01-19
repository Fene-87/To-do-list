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

    const updateComplete = document.querySelectorAll('.task-complete');
    const tasksList = Store.getLocalStorage();
    updateComplete.forEach((box, index) => {
      box.addEventListener('change', () => {
        if(box.checked){
        tasksList[index].completed = true;
        localStorage.setItem('tasks', JSON.stringify(tasksList));
        } else {
          tasksList[index].completed = false;
          localStorage.setItem('tasks', JSON.stringify(tasksList));
        }
      })
    })

    const deleteTask = document.querySelectorAll('.delete');
    const tasksDeleteList = Store.getLocalStorage();
    deleteTask.forEach((deletedTask, index) => {
      deletedTask.addEventListener('click', () => {
        deletedTask.parentElement.parentElement.parentElement.remove();
        tasksDeleteList[index].completed = true;
        localStorage.setItem('tasks', JSON.stringify(tasksDeleteList));

        Store.removeLocalStorage(tasksDeleteList);
      })
    })

    document.querySelector('.clear-button').addEventListener('click', (event) => {
      
      AddDelete.removeTask();
      const tasksList = Store.getLocalStorage();
      Store.removeLocalStorage(tasksList);
    })

  }
  
  window.onload = () => {
    component();
  }