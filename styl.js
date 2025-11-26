const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progress");

function addTask() {
  const taskInput = inputBox.value.trim();
  if (taskInput === "") {
    alert("You must write something!");
    return;
  }

  const li = document.createElement("li");
  li.className = "task";


  const lefttask = document.createElement("div");
  lefttask.style.flex = "1";

  const h4 = document.createElement("h4");
  h4.textContent = taskInput;

  const date = document.createElement("div");
  const datspan = document.createElement("span");
  datspan.textContent = new Date().toLocaleDateString();
  date.appendChild(datspan);

  lefttask.appendChild(h4);
  lefttask.appendChild(date);


  const righttask = document.createElement("div");
  righttask.style.display = "flex";
  righttask.style.alignItems = "center";
  righttask.style.gap = "8px";


  const editBtn = document.createElement("button");
  editBtn.className = "circular";
  editBtn.style.backgroundColor = "rgba(31, 21, 212, 1)";
  editBtn.style.color = "white";
  editBtn.textContent = "E";
  editBtn.onclick = function () {
    const newText = prompt("Edit your task ✏️", h4.textContent);
    if (newText && newText.trim() !== "") {
      h4.textContent = newText.trim();
    }
  };

  
  const compltbtn = document.createElement("button");
  compltbtn.className = "circular";
  compltbtn.style.backgroundColor = "rgba(58, 211, 12, 1)";
  compltbtn.style.color = "white";
  compltbtn.textContent = "C";
  compltbtn.onclick = function () {
    li.classList.toggle("completed");
    updateProgress();
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "circular";
  deleteBtn.style.backgroundColor = "rgba(216, 19, 19, 1)";
  deleteBtn.style.color = "white";
  deleteBtn.textContent = "D"

  deleteBtn.onclick = function () {
    li.remove();
    updateProgress();
  };

 
  righttask.appendChild(editBtn);
  righttask.appendChild(compltbtn);
  righttask.appendChild(deleteBtn);


  li.appendChild(lefttask);
  li.appendChild(righttask);
  listContainer.appendChild(li);

  inputBox.value = "";

  updateProgress();
}


function updateProgress() {
  const tasks = document.querySelectorAll("#list-container li");
  const completed = document.querySelectorAll("#list-container li.completed");

  const total = tasks.length;
  const done = completed.length;

  if (total === 0) {
    progressText.textContent = "No tasks yet! Start adding your goals 💪";
    progressBar.style.width = "0%";
    return;
  }

  const percentage = Math.round((done / total) * 100);
  progressBar.style.width = percentage + "%";

  let message = "";
  if (percentage === 0) message = "😴 You haven’t started yet!";
  else if (percentage < 50) message = "🙂 Keep going!";
  else if (percentage < 80) message = "💪 Great progress!";
  else message = "🎉 Excellent! You nailed your day!";

  progressText.textContent = `${message} (${percentage}%)`;
}
