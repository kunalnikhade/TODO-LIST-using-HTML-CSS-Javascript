let todoRootEl = document.getElementById("todoRoot");
let userInputEl = document.getElementById("userInput");

function getTodoFromLocalStorage() {
  let myTodoList = localStorage.getItem("myTodoList");

  if (myTodoList === null) {
    return [];
  } else {
    let parsedTodo = JSON.parse(myTodoList);

    return parsedTodo;
  }
}
let todoList = getTodoFromLocalStorage();

//To add line-through on the title

function onStatusUpdate(titleId, checkboxId) {
  let myTitle = document.getElementById(titleId);
  let myCheckBox = document.getElementById(checkboxId);
  let findTodoId = checkboxId[checkboxId.length - 1];

  for (each of todoList) {
    if (each.id == findTodoId) {
      if (each.isChecked === false) {
        each.isChecked = true;
      } 
      else {
        each.isChecked = false;
      }
    }
  }

  if (myCheckBox.checked === true) {
    myTitle.classList.add("checked");
  } 
  else {
    myTitle.classList.remove("checked");
  }
}

//to delete the todo
function onDeleteTodo(todoId) {
  // Remove the todo item 
  let myTodo = document.getElementById(todoId);
  todoRootEl.removeChild(myTodo);

  // Update the todoList array by removing the deleted item
  todoList = todoList.filter(todo => "todo" + todo.id !== todoId);

  // Save the updated todoList to local storage
  onSaveTodo();
}


function createAndAppend(todo) {
  let checkboxId = "checkbox" + todo.id;
  let titleId = "title" + todo.id;
  let todoId = "todo" + todo.id;

  let todoListEl = document.createElement("li");
  todoListEl.classList.add("todo-list-items");
  todoListEl.id = todoId;
  todoRootEl.appendChild(todoListEl);

  let checkBoxEl = document.createElement("input");
  checkBoxEl.type = "checkbox";
  checkBoxEl.id = checkboxId;
  checkBoxEl.onclick = function () {
    onStatusUpdate(titleId, checkboxId);
  };
  if (todo.isChecked === true) {
    checkBoxEl.checked = true;
  }
  todoListEl.appendChild(checkBoxEl);

  let labelEl = document.createElement("label");
  labelEl.classList.add("label-cont");
  labelEl.htmlFor = checkboxId;
  todoListEl.appendChild(labelEl);

  let titleEl = document.createElement("h5");
  titleEl.textContent = todo.title;
  titleEl.id = titleId;
  if (todo.isChecked === true) {
    titleEl.classList.add("checked");
  }
  labelEl.appendChild(titleEl);

  let deleteBTN = document.createElement("button");
  deleteBTN.classList.add("delete-btn");
  labelEl.appendChild(deleteBTN);
  deleteBTN.onclick = function () {
    onDeleteTodo(todoId);
  };

  let deleteIconEl = document.createElement("i");
  deleteIconEl.classList.add("fa-solid", "fa-trash");
  deleteBTN.appendChild(deleteIconEl);
}

for (let each of todoList) {
  createAndAppend(each); // call the above function
}

//to add NEW TODO
function onAddTodo() {
  const newTodo = {
    title: userInputEl.value,
    id: todoList.length + 1,
    isChecked : false
  };
  createAndAppend(newTodo);

  todoList.push(newTodo); //to add this New TODO in todoList

  userInputEl.value = ""; // Clear the input field after adding
}

//to save TODO
function onSaveTodo() {
  let stringifyTodo = JSON.stringify(todoList); //convert into the string
  localStorage.setItem("myTodoList", stringifyTodo); // Save the string to localStorage
}
