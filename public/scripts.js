let todoList = [
    {name:"Learn CSS",uniqueNo:0},
    {name:"Learn JavaScript",uniqueNo:1},
    {name:"Learn React",uniqueNo:2}
];
function addTaskAI(taskText){

    // clean unwanted words
    taskText = taskText
        .replace(/^I should\s*/i, "")
        .replace(/^I need to\s*/i, "")
        .replace(/^Remind me to\s*/i, "")
        .replace(/^I have to\s*/i, "")
        .replace(/\.$/, ""); // remove final dot
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
let ul=document.getElementById("todoelements");
//localStorage.removeItem("todoList"); to remove the item in localstorage
//to store in localstorage
let saveBtn=document.getElementById("saveBtn");
saveBtn.onclick=function(){
    storeAtLocalStorage();
}
function storeAtLocalStorage(){
    localStorage.setItem("todoList",JSON.stringify(todoList));
}

//get from localstorage
function getFromLocalStorage(){
    getTodo=localStorage.getItem("todoList");
    if(getTodo===null){
        return getTodo=[];
    }
    else{
        return getTodo=JSON.parse(getTodo);
    }
}
todoList=getFromLocalStorage();
let todoLength=todoList.length-1;
//to create a new task
function createTask(){
    let inputElement=document.getElementById("inputId");
    let inputValue=inputElement.value;
    if(inputValue===""){
        alert("Please enter a task");
        return;
    }
    else{
        let newTask={name:inputValue,uniqueNo:todoLength+1,ischecked:false};
        todoList.push(newTask);
        todoLength++;
        add(newTask);
        inputElement.value="";
    }
}
function toggleStatus(liId){
    let check=document.getElementById(liId);
    check.classList.toggle("checked");
}
//to add the items
function add(item){
    let li=document.createElement("li");
    li.id="li"+item.uniqueNo;
    li.classList.add("list");
    li.classList.add("d-flex");
    li.classList.add("flex-row");


    let checkbox=document.createElement("input");
    checkbox.classList.add("checkbox")
    checkbox.type="checkbox";
    checkbox.id="checkbox"+item.uniqueNo;
    checkbox.onclick=function(){
        toggleStatus(label.id)
    }
    li.appendChild(checkbox);
    
    let divForlabel=document.createElement("div");
    divForlabel.id="divForlabel"+item.uniqueNo;
    divForlabel.classList.add("d-flex");
    divForlabel.classList.add("flex-row");
    divForlabel.classList.add("bg-card");


    let label=document.createElement("label");
    label.id="label"+item.uniqueNo;
    label.setAttribute("for",checkbox.id);
    label.textContent=item.name;
    
    let divFordlt=document.createElement("i");
    divFordlt.id="dltbtn"+item.uniqueNo;
    divFordlt.onclick=function(){
                dltitem(li);
    }
    divFordlt.classList.add("fa");
    divFordlt.classList.add("fa-trash");
    divFordlt.classList.add("delete-icon");
    divFordlt.classList.add("dltbtn");
    divForlabel.appendChild(label);
    divForlabel.appendChild(divFordlt);
    li.append(divForlabel);
    ul.appendChild(li);
}
//to remove the item
function dltitem(li){

    let unique=parseInt(li.id.replace("li",""));
    let index=todoList.findIndex(function(item){
        if(item.uniqueNo===unique){
            return true;
        }
    });
    if(index!=-1){
        todoList.splice(index,1);
    }
    ul.removeChild(li);
}

function deleteAllTasks(){

    todoList = [];
    ul.innerHTML = "";
    todoLength = -1;

    alert("All tasks deleted");
}

function deleteTaskByVoice(text){

    for(let item of todoList){

        let words=item.name.toLowerCase().split(" ");

        for(let word of words){

            if(text.includes(word)){

                let li=document.getElementById("li"+item.uniqueNo);

                dltitem(li);

                alert(item.name + " deleted");

                return;
            }
        }
    }

    alert("Task not found");
}

function markTaskDone(text){

    let command = text
        .replace("done","")
        .replace("mark","")
        .replace("is","")
        .trim();

    for(let item of todoList){

        if(item.name.toLowerCase().includes(command)){

            let checkbox = document.getElementById("checkbox"+item.uniqueNo);
            let label = document.getElementById("label"+item.uniqueNo);

            if(checkbox){
                checkbox.checked = true;
            }

            if(label){
                label.classList.add("checked");
            }

            alert(item.name + " marked as done");

            return;
        }
    }

    alert("Task not found");
}
for(let item of todoList){
    add(item);
}
async function askAI(text) {
  const response = await fetch("http://localhost:3000/ai-task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  });

  const data = await response.json();

  addTaskAI(data.task);
}
const recognition = new webkitSpeechRecognition();

function startVoice(){

    const input = document.getElementById("inputId");

    input.placeholder = "🎤 Listening...";
    recognition.start();
}

recognition.onresult = function (event) {

  const speech = event.results[0][0].transcript.toLowerCase();

  console.log("Voice:", speech);

  // SAVE TASKS
  if (speech.includes("save")) {
      storeAtLocalStorage();
      alert("Tasks saved!");
      return;
  }

  // DELETE ALL TASKS
  if (speech.includes("delete all")) {
      deleteAllTasks();
      return;
  }

  // DELETE SPECIFIC TASK
  if (speech.includes("delete")) {
      deleteTaskByVoice(speech);
      return;
  }

  // MARK AS DONE
  if (speech.includes("done")) {
      markTaskDone(speech);
      return;
  }

  // otherwise send to AI
  askAI(speech);
};

recognition.onend = function(){

    const input = document.getElementById("inputId");

    input.placeholder = "Enter a task";
}
