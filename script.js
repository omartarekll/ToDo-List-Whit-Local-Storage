//
let tasksInput = document.querySelector(".input");
let addTaskBtn = document.querySelector(".add");
let newTasksArea = document.querySelector(".tasks");

// Array to store tasks
let arrayOfTasks = [];

//Check if there is tasks in local storage
if (localStorage.getItem("task")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("task"));
}

//
getDataFromLocalStorage();

// Cheack if input empty or no
addTaskBtn.onclick = function () {
  if (tasksInput.value !== "") {
    addTaskToArry(tasksInput.value);
    tasksInput.value = "";
  }
};

// DELETE
newTasksArea.addEventListener("click", (e) => {
  //IF this del ?
  if (e.target.classList.contains("del")) {
    //remove task from localStorage
    deletTaskWhitId(e.target.parentElement.getAttribute("data-id"));
    //Remove task from page
    e.target.parentElement.remove();
  }
  //Task Element
  if (e.target.classList.contains("task")) {
    toggleTaskStatusWhitId(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

function addTaskToArry(taskText) {
  //Task data
  const taskDataObj = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };

  //Push task to array
  arrayOfTasks.push(taskDataObj);
  // console.log(arrayOfTasks);

  //Add this task to page
  addElementsToPageFromArray(arrayOfTasks);

  //Add tasks to localSotage
  addTasksToLocalStorage(arrayOfTasks);
}

function addElementsToPageFromArray(arrayOfTasks) {
  // Clear tasks div
  newTasksArea.innerHTML = "";
  //Looping on array
  arrayOfTasks.forEach((task) => {
    //create task
    let newTask = document.createElement("p");
    newTask.className = "task";
    newTask.setAttribute("data-id", task.id);
    newTask.appendChild(document.createTextNode(task.title));

    // check if this task is done
    if (task.completed) {
      newTask.className = "task done";
    }

    // Add delete button
    let deleteCurrentTask = document.createElement("span");
    deleteCurrentTask.textContent = "Delete";
    deleteCurrentTask.className = "del";
    //Add tasks and btn to Page
    newTask.appendChild(deleteCurrentTask);
    newTasksArea.appendChild(newTask);
    // console.log(newTask);

    // Add task whit enter key
  });
  // tasksInput.addEventListener("keydown", (e) => {
  //   if (e.key === "Enter") {
  //     addTaskToArry(tasksInput.value);
  //     addTasksToLocalStorage(arrayOfTasks);
  //     addElementsToPageFromArray(arrayOfTasks);

  //     console.log("Enter key pressed!");
  //     // Optional: Prevent default form submission behavior if inside a form
  //     tasksInput.value = "";
  //     e.preventDefault();
  //   }
  // });
}

//
function addTasksToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("task", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("task");
  if (data) {
    let task = JSON.parse(data);
    // console.log(task);
    addElementsToPageFromArray(task);
  }
}

function deletTaskWhitId(taskId) {
  //   for (let i = 0; i < arrayOfTasks.length; i++) {
  //     console.log(`${arrayOfTasks[i].id}`);
  //   }
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addTasksToLocalStorage(arrayOfTasks);
}

function toggleTaskStatusWhitId(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    console.log(`${arrayOfTasks[i].id}`);
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addTasksToLocalStorage(arrayOfTasks);
}
