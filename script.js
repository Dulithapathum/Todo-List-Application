// Query selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", loadTodosFromLocalStorage);
todoButton.addEventListener("click", handleAddTodo);
todoList.addEventListener("click", handleItemActions);
filterOption.addEventListener("change", handleFilterTodos);

function handleAddTodo(event) {
  event.preventDefault();
  const todoText = todoInput.value.trim();

  if (todoText) {
    const todoElement = createTodoElement(todoText);
    todoList.appendChild(todoElement);
    saveTodoToLocalStorage(todoText);
    todoInput.value = "";
  }
}

function createTodoElement(todoText) {
  const todoDiv = document.createElement("div");
  todoDiv.className = "todo";

  const newTodo = document.createElement("li");
  newTodo.textContent = todoText;
  newTodo.className = "todo-item";
  todoDiv.appendChild(newTodo);

  const completedButton = createButton(
    "complete-btn",
    '<i class="fas fa-check-circle"></i>'
  );
  const trashButton = createButton("trash-btn", '<i class="fas fa-trash"></i>');

  todoDiv.append(completedButton, trashButton);
  return todoDiv;
}

function createButton(btnClass, innerHTML) {
  const button = document.createElement("button");
  button.innerHTML = innerHTML;
  button.className = btnClass;
  return button;
}

function handleItemActions(e) {
  const target = e.target;
  const todo = target.parentElement;

  if (target.classList.contains("trash-btn")) {
    deleteTodoElement(todo);
  } else if (target.classList.contains("complete-btn")) {
    toggleCompleteState(todo);
  }
}

function deleteTodoElement(todo) {
  todo.classList.add("slide");
  todo.addEventListener("transitionend", () => {
    removeTodoFromLocalStorage(todo);
    todo.remove();
  });
}

function toggleCompleteState(todo) {
  todo.classList.toggle("completed");
}

function handleFilterTodos(e) {
  const todos = [...todoList.childNodes];
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "";
        break;
      case "completed":
        todo.style.display = todo.classList.contains("completed") ? "" : "none";
        break;
      case "incomplete":
        todo.style.display = !todo.classList.contains("completed")
          ? ""
          : "none";
        break;
    }
  });
}

function saveTodoToLocalStorage(todo) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodosFromLocalStorage() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todoText) =>
    todoList.appendChild(createTodoElement(todoText))
  );
}

function removeTodoFromLocalStorage(todo) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos = todos.filter((todoText) => todoText !== todo.firstChild.textContent);
  localStorage.setItem("todos", JSON.stringify(todos));
}
