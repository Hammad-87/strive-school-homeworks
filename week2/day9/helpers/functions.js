String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

function addElement(container,element,props,callback){
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
    return newElement;
}