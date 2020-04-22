const layout = [
    ['7','8','9','-'],
    ['4','5','6','+'],
    ['1','2','3','÷'],
    ['C','0','←','×'],
    
    
];
let history=[];

function calculate(){
    let result = document.querySelector("#result");
    let resultText=result.innerText;
    try{
        //result.innerText=eval(result.innerText);
        let expression = resultText.replace("×","*").replace("÷","/");
        result.innerText =eval(expression).toFixed(9);
        updateHistory(eval(expression))
    }
    catch(e){
        result.innerText=e.message;
    }
}
function updateHistory(result){
    let historyNode = document.querySelector("#history");
    let div = document.createElement("div");
    div.innerText=result;
    historyNode.appendChild(div);
}
function createKeyboard(){
    let result = document.querySelector("#result");
    let container = document.querySelector("#keyboard")
    let keyboard =document.createElement('table');
    for(let i = 0; i<layout[0].length;i++){
        let row = document.createElement("tr");
        keyboard.appendChild(row);
        for(let j = 0; j<layout.length;j++){
            let button=layout[i][j];
            let col = document.createElement("td");
            row.appendChild(col);
            let div = document.createElement("div");
            col.onclick=function(){
               if(button==="←"){
                   let  text = result.innerText;
                   result.innerText=result.innerText.substring(0,text.length-1);
               }
               else if(button==="C"){
                    result.innerText=""
                    let historyNode = document.querySelector("#history");
                    historyNode.innerHTML =""
               }
               else{
                    result.innerText=result.innerText+button
               }
            }
            col.appendChild(div);
            div.innerText=button
            div.className="center"
        }
    }
    let lastLine = document.createElement("tr");
    let row = document.createElement("td");
    let dot = document.createElement("td");
    row.onclick=function(){
        calculate()
    }
    row.colSpan="2"
    dot.colSpan="2"
    lastLine.append(row);
    lastLine.append(dot)
    let div = document.createElement("div")
    div.className="center"
    div.innerText='='
    row.appendChild(div)
    let dotDiv=document.createElement("div");
    dotDiv.className="center"
    dotDiv.innerText='.'
    dot.appendChild(dotDiv)
    dot.onclick=function(){
        result.innerText=result.innerText+"."
    }
    keyboard.appendChild(lastLine)
    container.appendChild(keyboard)
}

window.onload = function (){
    createKeyboard()
    let result = document.querySelector("#result");
    result.onpaste=function(e){
        let clipboard = e.clipboardData || window.clipboardData;
        let data = clipboard.getData("Text");
        data=parseFloat(data)
        result.innerText=data;
    }
    result.onclick=function(e){
        let data = result.innerText;
        window.clipboardData.setData('text/plain', data);
        result.innerText="copied";
        setTimeout(()=>{
            result.innerText="";
        },1000)
    }
    result.oncopy=function(e){
        let data = result.innerText;
        e.clipboardData.setData('text/plain', data.trim());
        result.innerText="copied";
        setTimeout(()=>{
            result.innerText="";
        },1000)
        e.preventDefault();
    }
}
