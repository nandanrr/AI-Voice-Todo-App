let todoList = [
{name:"Learn CSS",uniqueNo:0},
{name:"Learn JavaScript",uniqueNo:1},
{name:"Learn React",uniqueNo:2}
];

let ul=document.getElementById("todoelements");

let saveBtn=document.getElementById("saveBtn");

saveBtn.onclick=function(){
storeAtLocalStorage();
};

// STORE TASKS
function storeAtLocalStorage(){
localStorage.setItem("todoList",JSON.stringify(todoList));
}

// GET TASKS
function getFromLocalStorage(){
let getTodo=localStorage.getItem("todoList");
if(getTodo===null){
    return [];
}
else{
    return JSON.parse(getTodo);
}

}

todoList=getFromLocalStorage();

let todoLength=todoList.length-1;

// ADD TASK MANUALLY
function createTask(){

let inputElement=document.getElementById("inputId");
let inputValue=inputElement.value;

if(inputValue===""){
    alert("Please enter a task");
    return;
}

let newTask={
    name:inputValue,
    uniqueNo:todoLength+1,
    ischecked:false
};

todoList.push(newTask);
todoLength++;

add(newTask);

inputElement.value="";
}

// ADD TASK FROM AI
function addTaskAI(taskText){

taskText = taskText
    .replace(/^I should\s*/i, "")
    .replace(/^I need to\s*/i, "")
    .replace(/^Remind me to\s*/i, "")
    .replace(/^I have to\s*/i, "")
    .replace(/\.$/, "");

taskText = taskText.charAt(0).toUpperCase() + taskText.slice(1);

let newTask={
    name:taskText,
    uniqueNo:todoLength+1,
    ischecked:false
};

todoList.push(newTask);
todoLength++;

add(newTask);

}

// MARK DONE
function toggleStatus(liId){
let check=document.getElementById(liId);
check.classList.toggle("checked");
}

// CREATE LIST ITEM
function add(item){

let li=document.createElement("li");
li.id="li"+item.uniqueNo;
li.classList.add("list");

let checkbox=document.createElement("input");
checkbox.classList.add("checkbox");
checkbox.type="checkbox";
checkbox.id="checkbox"+item.uniqueNo;

let label=document.createElement("label");
label.id="label"+item.uniqueNo;
label.textContent=item.name;

checkbox.onclick=function(){
    toggleStatus(label.id)
};

let deleteBtn=document.createElement("i");
deleteBtn.classList.add("fa","fa-trash","delete-icon");

deleteBtn.onclick=function(){
    dltitem(li);
};

li.appendChild(checkbox);
li.appendChild(label);
li.appendChild(deleteBtn);

ul.appendChild(li);

}

// DELETE ITEM
function dltitem(li){

let unique=parseInt(li.id.replace("li",""));

let index=todoList.findIndex(function(item){
    return item.uniqueNo===unique;
});

if(index!=-1){
    todoList.splice(index,1);
}

ul.removeChild(li);

}

// DELETE ALL
function deleteAllTasks(){
ul.innerHTML="";
todoList=[];
}

// DELETE BY VOICE
function deleteTaskByVoice(speech){

    speech = speech.toLowerCase();

    for(let item of todoList){

        let taskWords = item.name.toLowerCase().split(" ");

        for(let word of taskWords){

            if(word.length > 2 && speech.includes(word)){

                let li = document.getElementById("li"+item.uniqueNo);

                if(li){
                    dltitem(li);
                }

                return;
            }
        }
    }
}

// MARK DONE BY VOICE
function markTaskDone(speech){

    speech = speech.toLowerCase();

    for(let item of todoList){

        let taskWords = item.name.toLowerCase().split(" ");

        for(let word of taskWords){

            if(word.length > 2 && speech.includes(word)){

                let label=document.getElementById("label"+item.uniqueNo);
                let checkbox=document.getElementById("checkbox"+item.uniqueNo);

                if(label){
                    label.classList.add("checked");
                }

                if(checkbox){
                    checkbox.checked=true;
                }

                return;
            }
        }
    }
}

// RENDER TASKS
for(let item of todoList){
add(item);
}

// AI REQUEST
async function askAI(text){

const response = await fetch("http://localhost:3000/ai-task",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({text})
});

const data = await response.json();

addTaskAI(data.task);

}

// SPEECH RECOGNITION
const recognition=new webkitSpeechRecognition();

function startVoice(){

const input=document.getElementById("inputId");

input.placeholder="🎤 Listening...";

recognition.start();

}

recognition.onend=function(){

const input=document.getElementById("inputId");

input.placeholder="Enter a task";

}

// VOICE COMMANDS
recognition.onresult=function(event){
const speech=event.results[0][0].transcript.toLowerCase();

console.log("Voice:",speech);

if(speech.includes("save")){
    storeAtLocalStorage();
    alert("Tasks saved!");
    return;
}

if(speech.includes("delete all")){
    deleteAllTasks();
    return;
}

if(speech.includes("delete")){
    deleteTaskByVoice(speech);
    return;
}

if(speech.includes("done")){
    markTaskDone(speech);
    return;
}

askAI(speech);

};
