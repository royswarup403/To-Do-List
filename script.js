const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        inputBox.value = "";

        saveData();
    }
}

function saveData() {
    let tasks = [];

    listContainer.querySelectorAll("li").forEach(task => {
        tasks.push({
            name: task.innerText.trim(),
            checked: task.classList.contains("checked")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = localStorage.getItem("tasks");

    if (tasks) {
        tasks = JSON.parse(tasks);

        tasks.forEach(task => {
            let li = document.createElement("li");
            li.innerText = task.name;
            if (task.checked) {
                li.classList.add("checked");
            }
            listContainer.appendChild(li);

            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);
        });
    }
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }

    saveData();
});

loadTasks();
