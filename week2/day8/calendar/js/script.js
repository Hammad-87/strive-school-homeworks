var lastScrollTop = 0;
let index=0;
let modalOpen=false;
let savedProps = localStorage.getItem("db");

function createCalendar(month){
    let container = document.querySelector("#calendar-container");
    container.innerHTML="";
    let monthInfo = document.querySelector("#month-info");
    month.innerText="";
    monthInfo.innerText=month.today.monthName +" "+ month.today.year;
    let calendar = document.createElement("table");
    calendar.style.tableLayout="fixed";
    calendar.style.width="100%";
    container.appendChild(calendar);
    let days = month.days();
    if(days){
        console.log(days.length);
    }
    let index=0;
    for(let i = 0; i <4; i++){
        let week = document.createElement("tr");
        calendar.appendChild(week);
        for(let j = 0; j <7; j++){
            let dayData=days[index]
            let day = document.createElement("td");
            let infoContainer= document.createElement("div");
            let dayInfo = document.createElement("div");
            infoContainer.className="infoContainer"
            day.appendChild(infoContainer)
            infoContainer.innerText=dayData.dayName
            infoContainer.appendChild(dayInfo);
            day.id=`${dayData.day}_${dayData.month}_${dayData.year}`
            let events = document.createElement("div");
            events.id=`${dayData.day}_${dayData.month}_${dayData.year}_events`
            infoContainer.appendChild(events);
            dayData.id=`${dayData.day}_${dayData.month}_${dayData.year}`;
            day.onclick=function(){
                if(!modalOpen){
                    openModal(dayData)
                }
            }
            let today = new Date();
            if(dayData.day===today.getDate()&&dayData.year===today.getFullYear()&&dayData.month&&today.getMonth){
                dayInfo.id="current-day"
                dayInfo.innerText=dayData.day;
            }
            else{
                dayInfo.id="dayInfo"
                dayInfo.innerText=dayData.day +" "+dayData.monthName;
            }
            day.className="day"
            
            week.appendChild(day)
           
            index++;
        }
    }
    
}
function openModal(dayData){
    let body = document.querySelector("body");
    let modal = document.createElement("div");
    
    let backdrop = document.createElement("div");
   /* backdrop.onclick=function(){
         
    }*/
    modal.id="modal";
    backdrop.id="backdrop";
    backdrop.appendChild(modal);
    modal.className="slide-in-fwd-center";
    body.appendChild(backdrop);
    modalOpen=!modalOpen;
    createForm(dayData)
}

function createForm (dayData){
    let container = document.createElement("div");
    let modal = document.querySelector("#modal");
    modal.appendChild(container);
    container.style="width:100%";
    let header = document.createElement("div");
    container.appendChild(header);
    header.style.paddingBottom="0px";
    let title = document.createElement("h2");
    header.appendChild(title);
    title.innerText="Create Event"
    container.appendChild(document.createElement("hr"))
    addElement(container,"input",{type:"text",className:"input",id:"eventInputTitle",placeholder:"Event Title",value:"",label:"Event Title :"});
    addElement(container,"input",{type:"time",className:"input",id:"eventInputTime",placeholder:"Event Time",value:"20:30",label:"Event Time : "});
    addElement(container,"textarea",{type:"time",className:"input",id:"eventInputDescription",placeholder:"Event Description",value:"",label:"Event Description : "});
    addElement(container,"input",{type:"color",className:"input",id:"eventCategoryColor",value:"#b125da",label:"Color : ",style:"width:30px;height:30px;",onchange:function(){
        let color = document.querySelector("#eventCategoryColor").value;
        title.style.color=color;
    }});
    
    let actionContainer = document.createElement("div");
    container.appendChild(actionContainer);
    actionContainer.id="actions"
    addElement(actionContainer,"button",{type:"button",className:"button",id:"cancelButton",
    innerText:"Cancel",
    onclick:function(){
        closeModal()
    }});
    addElement(actionContainer,"button",{type:"button",className:"button",id:"addEventButton",
    innerText:"Add Event",
    onclick:async function (){
        
       let title = document.querySelector("#eventInputTitle").value;
       let time = document.querySelector("#eventInputTime").value;
       let date = dayData.object;
       
       let color = document.querySelector("#eventCategoryColor").value;
       let event={
           id:dayData.id,
           title,
           time,
           date,
           color,
       }
       let events = await localStorage.getItem("events");
       if(events){
           events=JSON.parse(events);
           events=[...events,event];
           localStorage.setItem("events",JSON.stringify(events));          
       }
       else{
           localStorage.setItem("events",JSON.stringify([event]))
       }
    
       closeModal()
       getEvents();
    }});
}
window.onload=function(){
    let month=new Month(0);
    this.createCalendar(month);
    getEvents();
}
function closeModal (){
    let body = document.querySelector("body");
    let modal = document.querySelector("#modal");
    modal.className="slide-out-bottom";
    setTimeout(()=>{
        body.removeChild(backdrop);
        modalOpen=!modalOpen;
        
    },500) 
}
function addElement(container,element,props){
    let newElement = document.createElement(element);
    let attributesPassed=false;
    if(props.label){
        let div = document.createElement("div");
        let label=document.createElement("label");
        label.innerText=props.label;
        div.appendChild(label)
        container.appendChild(div)
    }
    Object.entries(props).map(entry=>{
       if(entry[0]!=="label"){
        newElement[entry[0]]=entry[1];
        attributesPassed=true;
        
       } 
    })
    if(attributesPassed){
        container.append(newElement);
    }
}

async function getEvents (){
    let events =  await localStorage.getItem("events");
    if(events){
        events=JSON.parse(events);
    for(let i = 0; i <events.length;i++){
        let event = events[i];
        let id = `${event.id}`;
        let day = document.getElementById(event.id);
        let infoContainer  = day.querySelector(".infoContainer");
        let eventsDiv = document.getElementById(event.id+"_events");
        eventsDiv.style.width="100%";
        let eventChip = document.createElement("div");
        eventChip.id=event.id+"_"+event.title;
        eventChip.style.width="85%";
        eventChip.style.margin="1em";
        eventChip.style.padding="0.3em";
        eventChip.style.textAlign="center";
        eventChip.style.borderRadius="5px";
        eventChip.style.backgroundColor=event.color;
        eventChip.style.color="#fff"
        eventChip.style.fontSize="9pt";
        let data = `${event.title?event.title+"\n":""}${new Date(event.date).toLocaleDateString()} ${event.time}`;
        eventChip.innerText=data;
        eventChip.onclick=function(){
           //
        }
        let exist = document.getElementById(event.id+"_"+event.title);
        if(!exist){
            eventsDiv.appendChild(eventChip);
        }
        
    }
    }
}