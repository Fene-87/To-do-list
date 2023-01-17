/* eslint-disable */
import _ from 'lodash';
import './style.css';

function component() {
    const element = document.createElement('div');
    element.classList.add('element-list');
    element.innerHTML = `
      <div class="head-div">
        <div class="first-row"><h3>Today's To Do</h3> <span><i class="fa-sharp fa-solid fa-arrows-spin"></i></span> </div>
        <div class="first-row"><input type="text" class="book-input" id="book-title" placeholder="Add to your list..."/> <span><i class="fa-solid fa-plus"></i></span> </div>
      </div>
    `
    const tasks = [
      {
        description: 'Wash the dishes',
        completed: false,
        index: 0,
      },

      {
        description: 'Complete to do list project',
        completed: false,
        index: 1,
      },

    ]
  
    tasks.forEach((task) => {
      const row = document.createElement('div');
      row.classList.add('task-row');
      row.innerHTML = `
        <div class="task-element">
          <div class="task-description">
            <input type="checkbox"/> 
            <div class="task-text">${task.description}</div> 
          </div> 
          <div class="task-icon"><i class="fa-solid fa-ellipsis-vertical"></i></div>
        </div>
      `
      element.appendChild(row);
    })

    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear all completed';
    clearButton.classList.add('clear-button');
    element.appendChild(clearButton);
  
    return element;
  }
  
  document.body.appendChild(component());
  window.onload = () => {
    component();
  }