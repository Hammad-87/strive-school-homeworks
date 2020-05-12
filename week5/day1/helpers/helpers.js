/*

  container = >  div.container
  element => div , img ,a html element 
  props => style , className, href target 
*/

/*
    {innerText:"sadsad",className:"bla bla"}

    Object.entries(props) => [[innerText,"sadsd"],[className,"bla bla"]]
*/
function addElement(container, element, props) {
  let newElement = document.createElement(element);
  let attributesPassed = false;
  if (props.label) {
    let div = document.createElement("div");
    let label = document.createElement("label");
    label.innerText = props.label;
    div.appendChild(label);
    container.appendChild(div);
  }

  // props = {style:"width:200px",className:"class"}
  /*

    Object.entries(props)=> [['style','width:200px'],['className','class']]
    
  */
  Object.entries(props).map((entry) => {
    if (entry[0] !== "label") {
      newElement[entry[0]] = entry[1];
      attributesPassed = true;
    }
  });
  if (attributesPassed) {
    container.append(newElement);
  }
  return newElement;
}

const toHHMMSS = (secs) => {
  var sec_num = parseInt(secs, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor(sec_num / 60) % 60;
  var seconds = sec_num % 60;

  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
};
