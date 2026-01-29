// Panel open/close
function showPanel(panelId) {
  closePanels();
  const panel = document.getElementById(panelId);
  if (panel) {
    panel.classList.add("active");
  }
  if (panelId === "dashboardPanel") {
    updateIncompleteTasksList();
  }
  if (panelId === "tasksPanel") {
    renderTaskList();
  }
}

function closePanels() {
  document.querySelectorAll(".slide-panel").forEach((panel) => {
    panel.classList.remove("active");
  });
}

// Pomodoro Timer
let timerInterval;
let totalTime = 25 * 60;
let isRunning = false;

function updateTimerDisplay() {
  const minutes = Math.floor(totalTime / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalTime % 60).toString().padStart(2, "0");
  document.getElementById("timerDisplay").textContent = `${minutes}:${seconds}`;
}

function startStopTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
  } else {
    timerInterval = setInterval(() => {
      if (totalTime > 0) {
        totalTime--;
        updateTimerDisplay();
      } else {
        clearInterval(timerInterval);
        alert("Time's up! Take a break.");
        isRunning = false;
      }
    }, 1000);
  }
  isRunning = !isRunning;
}

function resetTimer() {
  clearInterval(timerInterval);
  totalTime = 25 * 60;
  updateTimerDisplay();
  isRunning = false;
}

updateTimerDisplay();

// Calendar Setup
const monthSelect = document.getElementById("monthSelect");
const yearSelect = document.getElementById("yearSelect");
const calendarBody = document.getElementById("calendarBody");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function populateMonthSelect() {
  months.forEach((month, idx) => {
    const option = document.createElement("option");
    option.value = idx;
    option.textContent = month;
    monthSelect.appendChild(option);
  });
}

function populateYearSelect() {
  const currentYear = new Date().getFullYear();
  for (let y = currentYear - 10; y <= currentYear + 10; y++) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    yearSelect.appendChild(option);
  }
}

function renderCalendar(year, month) {
  calendarBody.innerHTML = "";

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const today = new Date();

  let startDay = firstDay.getDay();
  const totalDays = lastDay.getDate();

  let row = document.createElement("tr");

  for (let i = 0; i < startDay; i++) {
    const cell = document.createElement("td");
    cell.classList.add("empty");
    row.appendChild(cell);
  }

  for (let day = 1; day <= totalDays; day++) {
    if ((startDay + day - 1) % 7 === 0 && day !== 1) {
      calendarBody.appendChild(row);
      row = document.createElement("tr");
    }

    const cell = document.createElement("td");
    cell.textContent = day;

    if (
      day === today.getDate() &&
      year === today.getFullYear() &&
      month === today.getMonth()
    ) {
      cell.classList.add("today");
    }

    row.appendChild(cell);
  }

  while (row.children.length < 7) {
    const emptyCell = document.createElement("td");
    emptyCell.classList.add("empty");
    row.appendChild(emptyCell);
  }

  calendarBody.appendChild(row);
}

monthSelect.addEventListener("change", () => {
  renderCalendar(parseInt(yearSelect.value), parseInt(monthSelect.value));
});
yearSelect.addEventListener("change", () => {
  renderCalendar(parseInt(yearSelect.value), parseInt(monthSelect.value));
});

function initCalendar() {
  populateMonthSelect();
  populateYearSelect();

  const now = new Date();
  monthSelect.value = now.getMonth();
  yearSelect.value = now.getFullYear();

  renderCalendar(now.getFullYear(), now.getMonth());
}

initCalendar();

// Tasks

let tasks = [
  { id: 1, text: "Task 1", completed: false },
  { id: 2, text: "Task 2", completed: true },
  { id: 3, text: "Task 3", completed: false },
];

function updateIncompleteTasksList() {
  const incompleteTasksList = document.getElementById("incompleteTasksList");
  incompleteTasksList.innerHTML = "";

  const incompleteTasks = tasks.filter((task) => !task.completed);

  if (incompleteTasks.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No incomplete tasks! Great job!";
    incompleteTasksList.appendChild(li);
    return;
  }

  incompleteTasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    incompleteTasksList.appendChild(li);
  });
}

// Render task list in Tasks panel with checkboxes
function renderTaskList() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No tasks added yet.";
    taskList.appendChild(li);
    return;
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.id = `task-${task.id}`;
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      updateIncompleteTasksList();
      renderTaskList();
    });

    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = task.text;

    li.appendChild(checkbox);
    li.appendChild(label);

    taskList.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (!text) return alert("Please enter a task.");

  const newTask = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  tasks.push(newTask);
  taskInput.value = "";
  renderTaskList();
  updateIncompleteTasksList();
}

function clearTasks() {
  if (
    confirm(
      "Are you sure you want to clear all tasks? This action cannot be undone."
    )
  ) {
    tasks = [];
    renderTaskList();
    updateIncompleteTasksList();
  }
}

document.getElementById('logoutBtn').addEventListener('click', () => {
  // Clear session/auth data here if needed
  // localStorage.removeItem('authToken');
  // sessionStorage.clear();

  // Redirect to login page
  window.location.href = 'login.html';
});
