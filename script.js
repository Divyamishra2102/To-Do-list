const todoValue = document.getElementById("todoText");
const todoAlert = document.getElementById("Alert");
const listItems = document.getElementById("list-items");
const addUpdate = document.getElementById("AddUpdateClick");
let todo = JSON.parse(localStorage.getItem("todo-list"));
if (!todo) {
  todo = [];}
function CreateToDoItems() {
    if (todoValue.value === "") {
      todoAlert.innerText = "Please enter your todo text!";
      todoValue.focus();
    } else {
      let IsPresent = false;
      todo.forEach((element) => {
        if (element.item == todoValue.value) {
          IsPresent = true;
        }});
     let li = document.createElement("li");
      const todoItems = `<div title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${todoValue.value}</div><div>
                      <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="https://tse2.mm.bing.net/th?id=OIP.gCrtMbY6QIs4jHtxKp1hyAHaHa&pid=Api&P=0&h=180" />
                      <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="https://tse4.mm.bing.net/th?id=OIP.vBGQ0r2nCTnroSFmtfER9wAAAA&pid=Api&P=0&h=180" /></div></div>`;
      li.innerHTML = todoItems;
      listItems.appendChild(li);
  if (!todo) {
        todo = [];    }
      let itemList = { item: todoValue.value, status: false };
      todo.push(itemList);
      setLocalStorage();
    }}
  function ReadToDoItems() {
    todo.forEach((element) => {
      let li = document.createElement("li");
      let style = "";
      if (element.status) {
        style = "style='text-decoration: line-through'";
      }
      const todoItems = `<div ${style} title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${
        element.item
      }
      ${
        style === ""
          ? ""
          : '<img class="todo-controls" src="https://tse2.mm.bing.net/th?id=OIP.ovSXbSMjRFdr-7PLOn54BAHaHa&pid=Api&P=0&h=180" />'
      }</div><div>
      ${
        style === ""
          ? '<img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="https://tse2.mm.bing.net/th?id=OIP.gCrtMbY6QIs4jHtxKp1hyAHaHa&pid=Api&P=0&h=180" />'
          : ""
      }
      <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="https://tse4.mm.bing.net/th?id=OIP.vBGQ0r2nCTnroSFmtfER9wAAAA&pid=Api&P=0&h=180" /></div></div>`;
      li.innerHTML = todoItems;
      listItems.appendChild(li);
    });
  }
  ReadToDoItems(); 
  function UpdateToDoItems(e) {
    if (
      e.parentElement.parentElement.querySelector("div").style.textDecoration ===
      ""
    ) {
      todoValue.value =
      e.parentElement.parentElement.querySelector("div").innerText;
      updateText = e.parentElement.parentElement.querySelector("div");
      addUpdate.setAttribute("onclick", "UpdateOnSelectionItems()");
      addUpdate.setAttribute("src", "https://www.svgrepo.com/show/51038/refresh-button.svg");
      todoValue.focus();
    }
  }
  
  function UpdateOnSelectionItems() {
    updateText.innerText = todoValue.value;
    addUpdate.setAttribute("onclick", "CreateToDoItems()");
    addUpdate.setAttribute("src", "https://cdn.pixabay.com/photo/2014/04/02/10/55/plus-304947_1280.png");
    todoValue.value = "";
    let IsPresent = false;
    todo.forEach((element) => {
      if (element.item == todoValue.value) {
        IsPresent = true;
      }
    });
  
    todo.forEach((element) => {
      if (element.item == updateText.innerText.trim()) {
        element.item = todoValue.value;
      }
    });
     }
  function DeleteToDoItems(e) {
    let deleteValue =
      e.parentElement.parentElement.querySelector("div").innerText;
   if (confirm(`Are you sure. Due you want to delete this ${deleteValue}!`)) {
      e.parentElement.parentElement.setAttribute("class", "deleted-item");
      todoValue.focus();
    todo.forEach((element) => {
        if (element.item == deleteValue.trim()) {
          todo.splice(element, 1);
        }});
  
      setTimeout(() => {
        e.parentElement.parentElement.remove();
      }, 1000);
    setLocalStorage();
    }
  }
  function CompletedToDoItems(e) {
    if (e.parentElement.querySelector("div").style.textDecoration === "") {
      const img = document.createElement("img");
      img.src = "https://www.svgrepo.com/show/51038/refresh-button.svg";
      img.className = "todo-controls";
      e.parentElement.querySelector("div").style.textDecoration = "line-through";
      e.parentElement.querySelector("div").appendChild(img);
      e.parentElement.querySelector("img.edit").remove();
  
      todo.forEach((element) => {
        if (
          e.parentElement.querySelector("div").innerText.trim() == element.item
        ) {
          element.status = true;
        }
      });}}