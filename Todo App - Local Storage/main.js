window.addEventListener('load', (event) =>{
    // get the todos from the local storage 
    todos = JSON.parse(localStorage.getItem('todos')) || [];

    // getting the new todo and name input
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');
    
    // getting the name from localStorage and adding to name input
    const username = localStorage.getItem('username') || '';
    nameInput.value = username;
    
    // storing the username in localStorage when user enters it
    nameInput.addEventListener('change', (event) =>{
        localStorage.setItem('username', event.target.value);
    });

    // adding event listener for new-todo-form for submitting
    newTodoForm.addEventListener('submit', (event) =>{
        event.preventDefault();

        // getting the todo item and related data
        const todo = {
            content : event.target.elements.content.value,
            category : event.target.elements.category.value,
            done : false,
            createdAt : new Date().getTime()
        }

        // adding to the todos array
        todos.push(todo);

        // updating the localStorage
        localStorage.setItem('todos', JSON.stringify(todos));

        // resetting the form
        event.target.reset();

        // displaying the todos
        displayTodos();
    });

    displayTodos();
});


// function to crate a new todo item, add it to list and display it
function displayTodos(){
    // getting the todo list and clearing all the old todo items
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = '';

    // Sorting todos based on the createdAt timestamp in descending order
    todos.sort((a, b) => b.createdAt - a.createdAt);
    
    // iterating through the todos taken from the localStorage
    todos.forEach(todo => {
        // creating a new todo item
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        // creating the required elements of todo item
        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const container = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteBtn = document.createElement('button');

        // adding the styling and other attributes to elements based on todo item
        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');

        // checking the category of the todo item and adding style accordingly
        if(todo.category === 'personal'){
            span.classList.add('personal');
        }else{
            span.classList.add('business');
        }

        // adding the styling classes to created element
        container.classList.add('todo-container');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteBtn.classList.add('delete');

        // adding innerHTMl to elements
        container.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        edit.innerHTML = 'Edit';
        deleteBtn.innerHTML = 'Delete';

        // appending the elements to divs
        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteBtn);

        // appending the labels, container and actions to todo-item
        todoItem.appendChild(label);
        todoItem.appendChild(container);
        todoItem.appendChild(actions);

        // appeding the todoItem to list
        todoList.appendChild(todoItem);

        // if task is done mark it done
        if(todo.done){
            todoItem.classList.add('done');
        }

        // handling the checked event for each todo item
        input.addEventListener('click', (event) =>{
            todo.done = event.target.checked;
            localStorage.setItem('todos', JSON.stringify(todo));
            if(todo.done){
                todoItem.classList.add('done');
            }else{
                todoList.classList.remove('done');
            }
            displayTodos();
        });

        // handling the edit button action for each todo item
        edit.addEventListener('click', (event) =>{
            const input = container.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', (event)=>{
                input.setAttribute('readonly',true);
                todo.content = event.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                displayTodos();
            });
        });

        deleteBtn.addEventListener('click', (event)=>{
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            displayTodos();
        });
    });
}