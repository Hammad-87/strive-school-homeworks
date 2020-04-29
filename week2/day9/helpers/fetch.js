const GET = (url,callback) => {
  try {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var data = JSON.parse(xhr.responseText);
        callback&&callback(data) 
      }
    };
  
    xhr.open("GET",url);
    xhr.send();
  }
  catch (e) {
      throw new Error(e)
  }
};
