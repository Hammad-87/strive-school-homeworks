// container = div
// element div
// props = {style:"width:280px"}
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

const GET = (url, callback) => {
  try {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var data = JSON.parse(xhr.responseText);
        callback && callback(data);
      }
    };

    xhr.open("GET", url);
    xhr.send();
  } catch (e) {
    throw new Error(e);
  }
};
