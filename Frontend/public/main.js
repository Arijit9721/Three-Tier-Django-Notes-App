// usefull variables
const form = document.querySelector('form')
const form_input= document.getElementById("todo-input")
const submit = document.getElementById("button")
const ul = document.getElementById("todo-list")

let alltodos = []

// main port for the django backend
const BASE_URL = "http://127.0.0.1:8000/api/todos/"

// Fetch all todos when page loads
document.addEventListener("DOMContentLoaded", fetchTodos);

// main function to handle form submitions
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    addTodo();
    console.log(alltodos);
})

// function to fetch todos from the django backend
function fetchTodos() {
    fetch(BASE_URL)
        .then(response => response.json())
        .then(data => {
            ul.innerHTML = "";
            data.forEach(todo => {
                const todo_item = create_todo(todo);
                ul.append(todo_item);
            });
        })
        .catch(error => console.error("Error fetching todos:", error));
    }


// helper function to add todos to the database
function addTodo(){
    form_value = form_input.value.trim();

    if (form_value.length > 0) {
        fetch(`${BASE_URL}create/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: form_value, is_completed: false })
        })
        .then(response => response.json())
        .then(() => {
            fetchTodos(); // Refresh list after adding
            form_input.value = ""; // Clear input field
        })
        .catch(error => console.error("Error adding todo:", error));
    }
}


// function to delete a todo from the database
function deleteTodo(todoId) {
    fetch(`${BASE_URL}${todoId}/delete/`, { method: "DELETE" })
        .then(() => fetchTodos()) // Refresh list after deletion
        .catch(error => console.error("Error deleting todo:", error));
}

// Function to toggle between completion status
function toggleTodo(todoId, isCompleted) {
    fetch(`${BASE_URL}${todoId}/update/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_completed: !isCompleted }) // Toggle value
    })
    .then(() => fetchTodos()) // Refresh list
    .catch(error => console.error("Error updating todo:", error));
}

// Helper function to create todo items
function create_todo(todo) {
    const todoli = document.createElement("li");
    todoli.className = "todo";

    const todoId = `todo-${todo.id}`;
    
    todoli.innerHTML = `
        <input type="checkbox" id="${todoId}" ${todo.is_completed ? "checked" : ""}>
        <label class="custom-checkbox" for="${todoId}">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
            </svg>
        </label>
        <label for="${todoId}" class="todo-text">
            ${todo.text}
        </label>
        <button class="delete-todo">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
        </button>
    `;

    // Toggle completion status when checkbox is clicked
    todoli.querySelector("input[type='checkbox']").addEventListener("change", () => {
        toggleTodo(todo.id, todo.is_completed);
    });

    // Handle deletion
    todoli.querySelector(".delete-todo").addEventListener("click", () => {
        deleteTodo(todo.id);
    });

    return todoli;
}


