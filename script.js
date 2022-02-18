const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
let taskList = [];
let id = 0;

// Events
document.addEventListener("DOMContentLoaded", () => {
  taskList = getTasksFromLocalStorage() || [];
  id = getIdFromLocalStorage();

  render();
});

// Classes
class Task {
  constructor() {
    this.id = id++;
    this.text = this.getText();
    this.checked = false;
  }

  getText() {
    return prompt("Please enter a Todo task:");
  }
}

// Functions
function newTask() {
  var task = new Task();
  taskList.push(task);

  render();
}

function render() {
  list.innerHTML = "";

  taskList
    .map(task => renderTask(task))
    .forEach(task => list.appendChild(task));
  itemCountSpan.textContent = taskList.length;
  uncheckedCountSpan.textContent = taskList.filter(task => !task.checked).length;
  
  if (taskList.length === 0) id = 0;
  saveToLocalStorage();
}

function renderTask(task) {
  const li = document.createElement("li");
  li.className = classNames.TODO_ITEM;

  li.innerHTML = 
      `<input type="checkbox" 
      class="${classNames.TODO_CHECKBOX}" 
      onchange="changeTask(${task.id})"
      ${task.checked ? "checked" : ""}>

      <button 
      class="${classNames.TODO_DELETE}" 
      onclick="deleteTask(${task.id})">
      delete</button>

      <span class="${classNames.TODO_TEXT}">
      ${task.text}</span>`;

  return li;
}

function deleteTask(id) {
  taskList = taskList.filter((task) => task.id !== id);

  render();
}

function changeTask(id) {
  taskList = taskList.map((task) =>
    task.id === id ? { ...task, checked: !task.checked } : task
  );

  uncheckedCountSpan.textContent = taskList.filter(task => !task.checked).length;
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("taskList", JSON.stringify(taskList));
  localStorage.setItem("id", id);
}

function getTasksFromLocalStorage() {
  const rawList = localStorage.getItem("taskList");
  const parsedList = JSON.parse(rawList);
  return parsedList;
}

function getIdFromLocalStorage() {
  const rawId = localStorage.getItem("id");
  const parsedId = JSON.parse(rawId);
  return parsedId;
}

