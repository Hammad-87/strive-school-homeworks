class Task{
    constructor(title,color){
        this.title=capitalize(title);
        this.color=color;
        this.done=false;
        this.get=function(){
            return{
                title:this.title,
                done:this.done,
                color:this.color,
            }
        }
        this.set=function(title,done){
            this.title=title;
            this.done=done;
            return {
                title:this.title,
                done:this.done,
            }
        }
    }
}
class TaskList {
     constructor(){
        this.list=[];
        this.direction="ascending"
        this.saveToStorage=function(){
            localStorage.setItem("list",JSON.stringify(this.list))
        }
        this.get=function(){
            return this.list;
        }

        this.set=function(list){
            this.list=list;
            this.saveToStorage();        
        }
        
        this.push=function(item){
            if(!this.includes(item.title)){
                this.list.push(item);
                this.count++;
                this.saveToStorage();
            }
            return this.list;
        }
        this.update=function(index,item){
            this.list.splice(index,1,item)
            this.saveToStorage();
            return this;
        }
        this.remove = function(item){
            let index = this.list.indexOf(item);
            if (index > -1) {
                this.list.splice(index, 1);
                this.count--;
              }
              else{
                  alert("a")
              }
            this.saveToStorage();
        
        }
        this.includes=function(title){
            for(var i=0; i <this.list.length; i++){
                if(this.list[i].title===title){
                    return true;
                }
            }
            return false;
        }
        this.removeFirst=function(){
            this.count--;
            this.list=this.list.shift();
            this.saveToStorage();
            this.saveToStorage();
            return this.list;
        }
        this.removeLast=function(item){
            this.count--;
            this.list=this.list.pop();
            this.saveToStorage();
            return this.list;
        }
        this.findByTitle= function(title){
            return this.list.filter(function(o){
                return o.title===title;
            })
        }
        this.sort=function(){
            if(this.direction==="ascending"){
                this.list=this.list.sort(function (a, b) {
                    if (a.title > b.title) {
                        return -1;
                    }
                    if (b.title > a.title) {
                        return 1;
                    }
                    return 0;
                });
                this.direction="descending ";
            }
            else{
                this.list=this.list.sort(function (a, b) {
                    if (a.title > b.title) {
                        return 1;
                    }
                    if (b.title > a.title) {
                        return -1;
                    }
                    return 0;
                });
                this.direction="ascending";
            }
            console.log(this.list)
            this.saveToStorage();
        }
    }
}
updateTaskList = function (taskList){
    
    let tasks = taskList.get();
    let list = document.querySelector("ul");
    list.innerHTML="";
    tasks.forEach((task,index) => {
        let listItem = document.createElement("li");
       
        let checkBox = document.createElement("input");
        checkBox.onclick=function(){
            task.done=!task.done;
            let updatedTaskList = taskList.update(index,task)
            updateTaskList(updatedTaskList)
            console.log(updatedTaskList.get())
        }
        let taskTitle = document.createElement("div");
        let deleteButton= document.createElement("button");
        deleteButton.onclick=function(){
            taskList.remove(task);
            updateTaskList(taskList)
        }
        let deleteIcon = document.createElement("i");
        deleteIcon.className="fa fa-trash-o"
        deleteButton.appendChild(deleteIcon);
        checkBox.className="checkbox";
        checkBox.type = "checkbox";
        taskTitle.innerText=task.title;
        checkBox.checked=task.done;
        let categoryColor = document.createElement("span");
        categoryColor.style.minWidth="15px";
        categoryColor.style.minHeight="15px";
        categoryColor.style.borderRadius="50%"
        categoryColor.style.backgroundColor=task.color;
        listItem.appendChild(categoryColor);
        listItem.appendChild(checkBox);
        listItem.appendChild(taskTitle);
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
        if(!taskList.includes(task)){
            listItem.classList.add('fade-in')
        }
        console.log(task)
    })
}
window.onload=function async(){
    const taskList = new TaskList();
    let storedList = localStorage.getItem("list");
    if(storedList){
      let parsed = JSON.parse(storedList);
      taskList.set(parsed);
      updateTaskList(taskList);
    }
    const addButton = document.querySelector("#add-button");
    const newTaskInput = document.querySelector("#new-task");
    let taskNotEmpty=newTaskInput.value.trim().length>0;
    let sortButton = document.querySelector("#sort");
    sortButton.onclick=function(){
        taskList.sort();
        updateTaskList(taskList);
    }
    newTaskInput.onkeydown=function(e){
        if(e.key==="Enter"){
            let taskTitle = newTaskInput.value;
            let colorPicker = document.querySelector("#color");
            let color = colorPicker.value;
            let newTask = new Task(taskTitle,color).get();
            if(newTask.title.trim().length>0){
             taskList.push(newTask)
             updateTaskList(taskList)
            }
           
            newTaskInput.value="";
        }
    }
    addButton.onclick =function(){
       let taskTitle = newTaskInput.value;
       let colorPicker = document.querySelector("#color");
       let color = colorPicker.value;
       let newTask = new Task(taskTitle,color).get();
       if(newTask.title.trim().length>0){
        taskList.push(newTask)
        updateTaskList(taskList)
       }
      
       newTaskInput.value="";
    }
}

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }