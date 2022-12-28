function id(id) {
    return document.getElementById(id);
}
let date = new Date();
id("dateContainer").innerHTML = date.getDate() + " : " + (date.getMonth() + 1) + " : " + date.getFullYear();
let TaskContainer = id("taskContainer");
const ControlBar = document.getElementById("controlBar");
const tasks = document.querySelector(".taskContainer");

function createTask() {
    let Task = document.createElement("div");
    Task.classList.add("task");

    let TaskInput = document.createElement("input");
    TaskInput.type = "text";
    TaskInput.classList.add("taskContent");
    TaskInput.readOnly = true;
    Task.appendChild(TaskInput);

    let Edit = document.createElement("input");
    Edit.type = "button";
    Edit.classList.add("editBtn");
    Edit.value = "Edit";
    Task.appendChild(Edit);

    let Done = document.createElement("input");
    Done.type = "button";
    Done.classList.add("doneBtn");
    Done.value = "Done";
    Task.appendChild(Done);


    let Delete = document.createElement("input");
    Delete.type = "button";
    Delete.classList.add("deleteBtn");
    Delete.value = "Delete";
    Task.appendChild(Delete);

    TaskContainer.appendChild(Task);
    localStorage.setItem("taskList", TaskContainer.innerHTML);
    id("taskStatus").innerHTML = tasks.childElementCount;
}

tasks.addEventListener('click', e => {
    if (e.target.matches("input")) {
        let inputTarget = e.target.parentElement;
        console.log("click");
        let targetClick = e.target;
        if (targetClick.value === "Edit") {
            (inputTarget.children[0].readOnly === false) ? inputTarget.children[0].readOnly = true : inputTarget.children[0].readOnly = false;
            inputTarget.children[0].placeholder = "Write Here";
            inputTarget.children[0].focus();
            targetClick.classList.toggle("disabled");
        }
        if (targetClick.value === "Done" || targetClick.value === "Not Done") {
            inputTarget.classList.add("done");
            inputTarget.children[0].disabled = true;
            inputTarget.children[1].style.display = "none";
            inputTarget.children[2].style.display = "none";


        }
        if (targetClick.value === "Delete" && confirm("\"" + inputTarget.children[0].value + "\"\nWould you like to remove this Task?")) {
            inputTarget.remove();
        }
        localStorage.setItem("taskList", TaskContainer.innerHTML);
        id("taskStatus").innerHTML = tasks.childElementCount;

    }
});

ControlBar.addEventListener('click', (e) => {
    let x = tasks.childElementCount;
    if (e.target.value === "Clear All" && confirm("Would You like to clear All Task?")) {
        for (let i = 0; i < x; i++) {
            tasks.children[0].remove();
        }
    }
    if (e.target.value === "Done All" && confirm("Would you like to mark all task as \"Done\"?")) {
        for (let i = 0; i < x; i++) {
            tasks.children[i].classList.add("done");
            tasks.children[i].children[0].disabled = true;
            tasks.children[i].children[1].style.display = "none";
            tasks.children[i].children[2].style.display = "none";

        }
    }
    localStorage.setItem("taskList", TaskContainer.innerHTML);
    id("taskStatus").innerHTML = tasks.childElementCount;

});
var storedValue = localStorage.getItem('taskList');
if (storedValue) {
    TaskContainer.innerHTML = storedValue;
}
id("taskStatus").innerHTML = tasks.childElementCount;
