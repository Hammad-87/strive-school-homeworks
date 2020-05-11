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
