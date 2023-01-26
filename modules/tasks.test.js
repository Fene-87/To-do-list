import '@testing-library/jest-dom'
import AddDelete from "./tasks";
import Store from './store';

describe('Test of Add and Delete Functions', () => {
    document.body.innerHTML = `
    <div class="element-list">
        <div class="head-div">
            <div class="first-row"><h3>Today's To Do</h3> <span><i class="fa-sharp fa-solid fa-arrows-spin"></i></span> </div>
            <div class="first-row"><input type="text" class="book-input" id="book-title" placeholder="Add to your list..." required/> <span><i class="fa-solid fa-plus"></i></span> </div>
        </div>
        <div class="tasked-list"></div>
        <button type="button" class="clear-button">Clear all completed</button>
    </div>
    `;

    test('Should show task is added', () => {
        
        AddDelete.addTask({description: 'Wash Dishes'});
        const list = document.querySelector('.task-text').value;
        expect(list).toBe('Wash Dishes');
    });

    test('Should show only one task is added to UI', () => {
        const list = document.querySelector('.tasked-list').childElementCount;
        AddDelete.addTask({description: 'Wash Dishes'});
        expect(list).toEqual(1);
    });

    test('Should show only one task is added to local storage', () => {
        
        Store.addLocalStorage({description: 'Wash Dishes'});
        const list = JSON.parse(localStorage.getItem('tasks')).length;
        expect(list).toEqual(1);
    });
    
    test('Should show task is removed', () => {
        Store.addLocalStorage({ description: 'Wash Dishes', completed: true });
        Store.addLocalStorage({ description: 'Wash House', completed: false });
        Store.removeLocalStorage();
        const list = JSON.parse(localStorage.getItem('tasks')).length;
        expect(list).toEqual(1);
    });
    
})