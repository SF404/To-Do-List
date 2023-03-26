// This function returns id of an Element
function $(id) {
    return document.getElementById(id);
}

// variable assignment
const header = $("header");
const aside = $("aside");
const actionBar = $("actionBar");
const taskContainer = $("taskContainer");
const reminderTime = $("reminderTime");
const currentTimeBox = $("currentTimeBox");

// Creating a map to store all data
let Data = [];

// current time
let currentTime, duration = 60000;
const updateGreeting = () => {
    let time = new Date();
    currentTime = time.getHours().toString().padStart(2, "0") + ":" + time.getMinutes().toString().padStart(2, "0");
    currentTimeBox.innerHTML = currentTime;
}
setInterval(updateGreeting, duration);

// Assigning Audio
let reminderSound = new Audio("sound/reminder.mp3");


// creating a class of task properties
class Task {
    // constructor for variable initialization
    constructor() {
        this.task = this.createTask();
        this.taskData = "";
        this.taskDone = false;
        this.taskEdit = false;
        this.taskTimeStamp = "";
        this.taskDoneTimeStamp = "Not Done";
        this.reminderTime;
    }
    // function for creating task
    createTask = () => {
        // creating elements of task
        const task = document.createElement("div");
        const taskData = document.createElement("input");
        const editBtn = document.createElement('span');
        const doneBtn = document.createElement('span');
        const deleteBtn = document.createElement('span');

        editBtn.innerHTML = `<span class="material-symbols-outlined">edit</span>`
        doneBtn.innerHTML = `<span class="material-symbols-outlined">done_all</span>`
        deleteBtn.innerHTML = `<span class="material-symbols-outlined">delete</span>`

        // combining task components and adding class list
        task.append(taskData, editBtn, doneBtn, deleteBtn);

        task.classList.add('task');
        taskData.placeholder = "write here";

        // set taskTimeStamp
        if (!this.taskTimeStamp) {
            let time = new Date();
            this.taskTimeStamp = time.getHours() + ":" + time.getMinutes() + " - " + time.getDate() + "/" + (time.getMonth() + 1);
        }
        else {
            taskData.value = this.taskData;
            taskData.readOnly = true;
            if (this.taskDone === true) {
                task.style.backgroundColor = '#f6c425';
            }
        }


        // ----------- Event listeners task properties --------------
        // task input
        taskData.addEventListener('input', () => {
            this.taskData = taskData.value;
        })
        // edit Button
        editBtn.addEventListener('click', () => {
            (taskData.readOnly == true) ? taskData.readOnly = false : taskData.readOnly = true;
            taskData.focus();
        })
        // done Button
        doneBtn.addEventListener('click', () => {
            if (this.taskDone == false) {
                // Task Done time Stamp
                let time = new Date();
                this.taskDoneTimeStamp = time.getHours() + ":" + time.getMinutes() + " - " + time.getDate() + "/" + (time.getMonth() + 1);

                this.taskDone = true;
                task.style.backgroundColor = '#f6c425';
                taskData.readOnly = true;
            }
            else {
                this.taskDone = false;
                task.style.backgroundColor = 'whitesmoke';
                this.taskDoneTimeStamp = "Not Done";
            }
        })
        // delete Button
        deleteBtn.addEventListener('click', (e) => {            
            let deleteCount=setTimeout(() => {
                deleteBtn.parentElement.remove();
                Data.splice(Data.indexOf(this), 1);
                delete this;
                console.log(this.taskData, "deleted", Data);
                updateTaskCount();
            }, 2000);
            task.style.backgroundColor = '#f29262';
        })
        // task click Event for updating task status
        // --------------------------------------------------------------------

        const upadteTaskStatus = () => {
            $("taskTime").innerHTML = `Task Time : ${this.taskTimeStamp}`
            $("taskDoneTime").innerHTML = `Done Time : ${this.taskDoneTimeStamp}`
            // setReminder component
            reminderTime.innerHTML = `<span>
            <input type="time" id="timeInput" name="timeInput">
            <input type="submit" value="Set">
            </span>`;

            if (this.reminderTime) {
                $("timeInput").value = this.reminderTime;
            }

            reminderTime.onsubmit = () => {
                this.reminderTime = $("timeInput").value.toString();
                console.log(this.reminderTime)
                checkTime();
                return false;
            }
        }

        // check Time 
        const checkTime = () => {
            let timer = setInterval(() => {
                if (this.reminderTime <= currentTime && this.reminderTime) {
                    reminderSound.play();
                    reminderSound.onended = () => alert("Reminder :  " + this.taskData);
                    clearInterval(timer);
                }
            }, duration / 6)
        }
        task.addEventListener('click', upadteTaskStatus)
        // updating Task Count
        updateTaskCount();
        upadteTaskStatus();

        return task;
    }
}



let t1 = new Task();
Data.push(t1)

$("taskContainer").appendChild(t1.createTask());

function updateTaskCount() {
    actionBar.children[0].innerHTML = `${Data.length} Task`;
}

const newTaskBtn = $("newTaskBtn");
newTaskBtn.addEventListener('click', () => {
    let task = new Task();
    Data.push(task);
    $("taskContainer").appendChild(task.createTask());
    console.log(Data)
})

// $("saveData").addEventListener('click', ()=>{
//     let d=JSON.parse(localStorage.getItem('data'));
//     console.log(d);
// })


// // --------------- Save Data ----------------
// let history = new Map();
// let selectedHistoryItem;
// const addEntry = (entryName) => {
//     let dataField = document.createElement('button');
//     dataField.innerHTML = entryName;
//     $("historyData").appendChild(dataField);
//     taskContainer.innerHTML = "";

//     history.set(entryName, [...Data]);
//     localStorage.setItem('datalist', JSON.stringify(Array.from(history.entries())));

//     dataField.addEventListener('click', () => {
//         taskContainer.innerHTML = "";
//         Data = history.get(entryName);
//         selectedHistoryItem = entryName;
//         Data.forEach(element => {
//             taskContainer.appendChild(element.createTask());
//         });
//     });
// }

// $("saveData").addEventListener('click', () => {
//     let entryName;
//     selectedHistoryItem ? entryName = selectedHistoryItem : entryName = prompt("Enter Name: ");
//     if (!entryName) {
//         let t = new Date();
//         entryName = t.getHours() + "" + t.getMinutes() + "" + t.getSeconds() + "_" + t.getDate() + t.getMonth() + t.getFullYear() + "_" + history.size;
//     }
//     if (history.has(entryName)) {
//         history.set(entryName, [...Data]);
//     }
//     else {
//         addEntry(entryName);
//     }

//     console.log("Entry Added")
// });





// Function to set username
function setUsername() {
    localStorage.setItem("username", $("usernameInput").value);
}


window.onload = () => {
    updateGreeting();
    // UserName
    let username = localStorage.getItem("username");
    if (!username) {
        $("takeUsername").style.display = "block";
    }
    $("userName").innerHTML = username;

    // let dataList = JSON.parse(localStorage.getItem('data'));
    //     dataList.forEach(entry => {
    //     console.log(entry.task);
    //     taskContainer.appendChild(entry.task);
    // });
}