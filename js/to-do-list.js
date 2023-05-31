function handleRenderToDoList(items) {
  const listContainer = document.getElementById("to-do-list-container");

  const allContent = items.reduce((accumulator, currentValue) =>
    accumulator + 
    `<li class="relative w-fit max-w-[500px] flex flex-col p-4 border-l-4 rounded-r-lg border-purple-600 bg-gray-900" id=${currentValue.id}>
      <h3 class="text-sm font-medium text-gray-100">${currentValue.title}</h3>
      <div class="mt-3 flex">
        <button onclick="finishTodoButtonClick('${currentValue.id}')" type="button" class="bg-gray-900 shadow px-2 py-1.5 rounded text-sm font-medium text-gray-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-600">Finalizar</button>
        <button onclick="updateTodoButtonClick('${currentValue.id}')" type="button" class="ml-1 bg-gray-900 shadow px-2 py-1.5 rounded text-sm font-medium text-gray-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-600">Editar</button>
        <button onclick="removeTodoButtonClick('${currentValue.id}')" type="button" class="ml-1 bg-gray-900 shadow px-2 py-1.5 rounded text-sm font-medium text-gray-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-600">Remover</button>
      </div>
    </li>`
  , "");

  listContainer.innerHTML = allContent;
}

function handleRenderFinishedToDoList(items) {
  const listContainer = document.getElementById("to-do-list-finished-container");

  const allContent = items.reduce((accumulator, currentValue) =>
    accumulator + 
    `<li class="relative w-fit max-w-[500px] flex flex-col p-4 rounded-lg bg-green-900 gap-2" id=${currentValue.id}>
      <h3 class="text-sm font-medium text-gray-100">${currentValue.title}</h3>

      <button 
        onclick="removeTodoButtonClick('${currentValue.id}')" 
        type="button" 
        class="ml-1 bg-green-800 shadow px-2 py-1.5 rounded text-sm font-medium text-gray-200 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-600"
      >
        Remover
      </button>
    </li>`
  , "");

  listContainer.innerHTML = allContent;
}

function clearInput() {
  const input = document.querySelector("#text");
  input.value = "";
  input.focus();
}

function setToLocalStorage({ pendingItems, finishedItems }) {
  localStorage.setItem("pending-items", JSON.stringify(pendingItems));
  localStorage.setItem("finished-items", JSON.stringify(finishedItems));
}
function getFromLocalStorage() {
  const pendingItems = JSON.parse(localStorage.getItem("pending-items"));
  const finishedItems = JSON.parse(localStorage.getItem("finished-items"));

  return { pendingItems, finishedItems }
}


function createToDo({ pendingItems, title }) {
  const id = self.crypto.randomUUID();
  const newItem = { id, title, status: "pending" }

  return [ newItem, ...pendingItems ];
}

function finishToDo({ pendingItems, finishedItems, id }) {
  const todoItem = pendingItems.find(item => item.id === id);

  return {
    newPendingItems: pendingItems.filter(item => item.id !== id),
    newFinishedItems: [ { ...todoItem, status: "finished" }, ...finishedItems ]
  }
}

function updateToDo({ pendingItems, id, title }) {
  return pendingItems.map(item => {
    if(item.id === id)
      return { ...item, title };

    return item;
  })
}

function removeToDo({ items, id }) {
  return items.filter(item => item.id !== id)
}


function getItems() {
  const listPendingContainer = document.getElementById("to-do-list-container");
  const listFinishedContainer = document.getElementById("to-do-list-finished-container");

  function extractItems({ collection, status }) {
    return Array.from(collection).map(item => {
      const title = item.querySelector("h3").innerText;
      
      return { id: item.id, title, status }
    })
  }

  const pendingItems = extractItems({ collection: listPendingContainer.children, status: "pending" });
  const finishedItems = extractItems({ collection: listFinishedContainer.children, status: "finished" });
  
  return {
    pendingItems,
    finishedItems
  }
}


function createTodoButtonClick() {
  const inputValue = document.querySelector("#text").value;
  const { pendingItems, finishedItems } = getItems();
  const newToDoList = createToDo({ pendingItems: pendingItems, title: inputValue });
  
  handleRenderToDoList(newToDoList);
  handleRenderFinishedToDoList(finishedItems);

  setToLocalStorage({ finishedItems, pendingItems: newToDoList })

  clearInput()
}

function finishTodoButtonClick(id) {
  const { pendingItems, finishedItems } = getItems();
  const { newPendingItems, newFinishedItems } = finishToDo({ pendingItems, finishedItems, id });
  
  handleRenderToDoList(newPendingItems);
  handleRenderFinishedToDoList(newFinishedItems);

  setToLocalStorage({ 
    finishedItems: newFinishedItems, 
    pendingItems: newPendingItems 
  })
}

function updateTodoButtonClick(id) {
  const inputValue = document.querySelector("#text").value;

  if(!inputValue)
    return;

  const { pendingItems, finishedItems } = getItems();
  const newToDoList = updateToDo({ pendingItems: pendingItems, id, title: inputValue });
  
  handleRenderToDoList(newToDoList);
  handleRenderFinishedToDoList(finishedItems);

  setToLocalStorage({ finishedItems, pendingItems: newToDoList })

  clearInput();
}

function removeTodoButtonClick(id) {
  const { pendingItems, finishedItems } = getItems();
  const newPendingToDoList = removeToDo({ items: pendingItems, id });
  const newFInishedToDoList = removeToDo({ items: finishedItems, id });
  
  handleRenderToDoList(newPendingToDoList);
  handleRenderFinishedToDoList(newFInishedToDoList);

  setToLocalStorage({ 
    finishedItems: newFInishedToDoList, 
    pendingItems: newPendingToDoList 
  })
}

function main() {
  const { pendingItems, finishedItems } = getFromLocalStorage();

  const addButton = document.querySelector("#add-todo-button");
  addButton.addEventListener("click", createTodoButtonClick)

  handleRenderToDoList(pendingItems);
  handleRenderFinishedToDoList(finishedItems)
}

main()