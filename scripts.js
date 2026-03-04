let todoList = [
    {name:"Learn CSS",uniqueNo:0},
    {name:"Learn JavaScript",uniqueNo:1},
    {name:"Learn React",uniqueNo:2}
];
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


for(let item of todoList){
    add(item);
}