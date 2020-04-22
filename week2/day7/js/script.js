const layout = [
    ['7','8','9','-','√x'],
    ['4','5','6','+','n!'],
    ['1','2','3','÷','x²'],
    ['C','0','←','×','∑'],
    
    
];
function isInLayout (key) {
    let value = key.toLowerCase();
    for (var i = 0; i <layout.length; i++){
        for (var j = 0; j<layout.length; j++){
            if(value===layout[i][j].toLowerCase()){
                return true;
            }
        }
    }
    return false;
}
let history=[];

function calculate(){
    let result = document.querySelector("#result");
    let resultText=result.value;
    try{
        //result.value=eval(result.value);
        let expression = resultText.replace("×","*").replace("÷","/");
        result.value =eval(expression).toFixed(2);
        updateHistory(eval(expression))
    }
    catch(e){
        result.value="Math Error"
    }
    finally{
        result.focus()
    }
}
function updateHistory(result){
    if(!history.includes(result)){
        let historyNode = document.querySelector("#history");
        let div = document.createElement("div");
        div.innerText=result;
        history.push(result)
        historyNode.appendChild(div);
    }
}
function createKeyboard(){
    
    let result = document.querySelector("#result");
    let resultisNotEmpty = result.innerText.trim().length>0;
    let container = document.querySelector("#keyboard")
    let keyboard =document.createElement('table');
    for(let i = 0; i<layout.length;i++){
        let row = document.createElement("tr");
        keyboard.appendChild(row);
        for(let j = 0; j<layout[0].length;j++){
            let button=layout[i][j];
            let col = document.createElement("td");
            row.appendChild(col);
            let div = document.createElement("div");
            col.onclick=function(){
               if(button==="←"){
                   let  text = result.value;
                   result.value=result.value.substring(0,text.length-1);
               }
               else if(button==="C"){
                    result.value=""
                    let historyNode = document.querySelector("#history");
                    historyNode.innerHTML =""
               }
               else if(button==="√x"){
                let value =result.value;
                result.value=`√`+parseFloat(value)
                 setTimeout(()=>{
                     result.value=Math.sqrt(parseFloat(value))
                 },500)
                }
                else if(button==="x²"){
                    let value =result.value;
                     result.value=`${value}²`;
                     setTimeout(()=>{
                         result.value=Math.pow(parseFloat(value),2)
                     },500)
                 }
                 else if(button==="n!"){
                    let value =result.value;
                     result.value=`${value}!`;
                     setTimeout(()=>{
                         result.value=factorial(parseFloat(value))
                     },500)
                 }
                 else if(button==="∑"){
                    let value =result.value;
                     result.value=`∑${value}`;
                     setTimeout(()=>{
                         result.value=(parseFloat(value)*(parseFloat(value)+1))/2;
                     },500)
                 }
               else{
                   
                result.value=result.value+button
                     
                   
               }
               setTimeout(()=>{
                result.focus();
               },500)
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
        let chars = result.value.split("")
       if(chars.includes("+")||chars.includes("-")||chars.includes("÷")||chars.includes("×")){
           calculate()
       }
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
        result.value=result.value+"."
    }
    keyboard.appendChild(lastLine)
    container.appendChild(keyboard)
}

window.onload = function (){
    createKeyboard()
    let result = document.querySelector("#result");
    result.focus();
    let body = document.getElementsByTagName("body");
    result.onkeydown = function(e){
        let valid = ["/","*","-","+","7","8","9","1","2","3","4","5","6",".","0","Enter","Backspace"];
        if(valid.includes(e.key)){
            result.innerText=result.innerText+e.key
            if(e.key==="Enter"){
                calculate()
            }
        }
        else{
            e.preventDefault();
        }        
    }
    result.onpaste=function(e){
        let clipboard = e.clipboardData || window.clipboardData;
        let data = clipboard.getData("Text");
        data=parseFloat(data)
        result.value=data;
    }
 
    result.oncopy=function(e){
        let data = result.value;
        e.clipboardData.setData('text/plain', data.trim());
        result.value="copied";
        setTimeout(()=>{
            result.value="";
        },1000)
        e.preventDefault();
    }
}

const factorial = function(n) {
    if(n == 0) {
        return 1
    } else {
        return n * factorial(n - 1);
    }
}
