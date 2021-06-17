
let input = document.querySelector(".tasklist__taskcontrol-form-textinput"),
    addTask = document.querySelector(".tasklist__taskcontrol-form-button"),
    tasks = document.querySelector(".tasks");

let taskList = [];

if (localStorage.getItem('task')) {
    taskList = JSON.parse(localStorage.getItem('task'));
    displayTasks();
};


addTask.addEventListener('click', function () {
    let newTaskList = {
        task: input.value,
        ready: false,
    };  
    taskList.push(newTaskList);
    displayTasks ();
    localStorage.setItem('task', JSON.stringify(taskList));
});

function readyAll (i) {
   document.getElementById('readyAll').addEventListener('click', function () {
    checkReady = document.querySelectorAll('#ready_'+i);
    checkUnready = document.querySelectorAll('#unready_'+i);
    imgReady = document.querySelectorAll('#img_ready_'+i);
    imgUnready = document.querySelectorAll('#img_unready_'+i);
    for(i=0; i<checkReady.length; i++) {
        checkReady[i].hidden = true;
        checkUnready[i].hidden = false;
        imgReady[i].hidden = false;
        imgUnready[i].hidden = true;
        };
    });
};

function removeAll (i) {
    document.getElementById('removeAll').addEventListener('click', function () {
     checkReady = document.querySelectorAll('#ready_'+i);
     for (let i = 0; i < taskList.length; i++) { 
        let elem = document.getElementById('item_'+i);
        elem.parentNode.removeChild(elem);
      };
      localStorage.clear();
     });
};

function ready (i) { 
    document.getElementById('ready_'+i).addEventListener('click', function () {
    document.querySelector('#unready_'+i).hidden = false;
    document.querySelector('#ready_'+i).hidden = true;
    document.querySelector('#img_unready_'+i).hidden = true;
    document.querySelector('#img_ready_'+i).hidden = false;
    localStorage.setItem('readyCheck', 'ready')
});
};



function unready (i) {
    document.getElementById('unready_'+i).addEventListener('click', function () {
        document.querySelector('#unready_'+i).hidden = true;
        document.querySelector('#ready_'+i).hidden = false;
        document.querySelector('#img_unready_'+i).hidden = false;
        document.querySelector('#img_ready_'+i).hidden = true;  
    });
};

function remove (i) {
    document.getElementById('delete_'+i).addEventListener('click', function () {
        let elem = document.getElementById('item_'+i);
        elem.parentNode.removeChild(elem);
        localStorage.removeItem('task');
    });
};

function displayTasks () {
    let displayTask = '';
    taskList.forEach(function (item, i) {
        displayTask += `
        <div class="tasklist__item" id="item_${i}">
        <div class="tasklist__item-text">
            <div class="tasklist__item-text-text"> 
                <p id="tasklistText">${item.task}
                </p> 
            </div>
            <div class="tasklist__item-text-buttons">
                <button class="tasklist__item-ready" id="ready_${i}">READY</button>
                <button hidden class="tasklist__item-unready" id="unready_${i}">UNREADY</button>
                <button class="tasklist__item-delete" id="delete_${i}">DELETE</button>
            </div>
        </div>
        <div class="tasklist__item-status">
            <div hidden class="tasklist__item-status-ready" id="img_ready_${i}">
                <img src="img/status_ready.png"/>
            </div>
            <div class="tasklist__item-status-unready" id="img_unready_${i}">
                <img src="./img/status_unready.png"/>
            </div>
        </div>
    </div>
        `;    
        tasks.innerHTML = displayTask; 
        readyAll(i);
        removeAll(i);
        console.log(taskList);
        checkReady = document.querySelectorAll('#ready_'+i);
    });
    for (let i = 0; i < taskList.length; i++) { 
        ready(i);
        unready(i);
        remove(i)
    };
};





















































