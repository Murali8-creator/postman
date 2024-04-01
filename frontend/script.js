export const id = (id) => document.getElementById(id);
const getCls = (cls) => document.getElementsByClassName(cls);

function getElementFromStr(str) {
  let div = document.createElement("div");
  div.innerHTML = str;
  return div.firstElementChild;
}

let addedParamsCount = 1;
const jsonBox = id("jsonBox");
const parametersBox = id('parametersBox');
const addButton = id('addButton');
const newParams = id("newParams");
const submit = id('myButton');
let data = {};
let jsonRequestBoxValue;
let responseBoxValue;
const getEl = id("get");
const postEl = id("post");
const contentBox = id("contentBox");
const json = id("JSON");
const customParam = id("customParam");
let contentType;

//hide the parameters box initially 
parametersBox.style.display = "none";

//if the user clicks on params, hide the json box
customParam.addEventListener('click', () => {
  jsonBox.style.display = "none";
  parametersBox.style.display = "block";
  newParams.style.display = "block";
})

//if the user clicks on json box, hide the params box
json.addEventListener('click', (e) => {
  parametersBox.style.display = "none";
  jsonBox.style.display = "block";
  newParams.style.display = "none";
})

//if the user clicks on 'get' hide the selected content type
getEl.addEventListener('click', (event) => {
  if (event.target.checked) {
    contentBox.style.display = "none";
    jsonBox.style.display = "none";
    parametersBox.style.display = "none";
    newParams.style.display = "none";
  }
})

//if the user clicks on 'post' show the content type options
postEl.addEventListener('click', (event) => {
  if (event.target.checked) {
    contentBox.style.display = "block";
  }
})

//if the user clicks on + button , add more parameters
addButton.addEventListener("click", (e) => {
  console.log("entered..");
  let str = `<div class="row mt-3">
    <label for="parameterKey${addedParamsCount + 1}" class="col">Parameter${addedParamsCount + 1}</label>
    <div class="col">
      <input id="parameterKey${addedParamsCount + 1}" type="text" class="form-control" placeholder="Enter Parameter${addedParamsCount + 1} Key">
    </div>
    <div class="col">
      <input id="parameterValue${addedParamsCount + 1}" type="text" class="form-control" placeholder="Enter Parameter${addedParamsCount + 1} Value">
    </div>
    <button class="deleteButtons col-sm-1 btn btn-primary" data-bs-toggle="modal" data-bs-target="#del-modal">-</button>
  </div>`;
  console.log(str);

  //convert the element string to DOM(div) node
  let paramEle = getElementFromStr(str);
  console.log(paramEle);
  newParams.appendChild(paramEle);
  console.log(newParams);
  addedParamsCount++;

  //adding an event listener to remove a parameter
  let deleteButtons = getCls('deleteButtons');
  for (item of deleteButtons) {
    item.addEventListener('click', (e) => {
      //add a confirmation box to confirm parameter deletion
      e.target.parentElement.remove();
    })
  }
});//add button event listener ends here




submit.addEventListener('click', () => {
  //show please wait in the respose box
  id("responseJsonText").value = "Please wait...";

  //Fetch all the values user has entered 
  let url = id("urlField").value;

  //after clicking submit know the request type
  let requestType = document.querySelector("input[name='request']:checked").getAttribute("id");

  //if request type is post then collect the user entered data in an object
  if (requestType === 'post') {
    console.log("request type : post");
    contentType = document.querySelector("input[name='content']:checked").getAttribute("id");

    if (contentType === 'customParam') {
      data = {};
      console.log("content type : customParam");
      for (let i = 1; i <= addedParamsCount; i++) {
        if (id('parameterKey' + i) != undefined) {
          let key = id('parameterKey' + i).value;
          let val = id('parameterValue' + i).value;

          data[key] = val;
          console.log("data : ", data);
        }
      }
      // console.log(data);
      data = JSON.stringify(data);
      console.log("data after converting to string", data);
    }
    else {
      jsonRequestBoxValue = id("jsonRequestBox").value;
      console.log(jsonRequestBoxValue);
      data = jsonRequestBoxValue;
      console.log(typeof data);
    }

    fetch(url, {
      method: 'POST',
      body: data,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text()
    })
      .then((text) => {
        console.log("text : ", text);
        id("responseJsonText").value = text
      }
      )
      .catch((err) => {
        let errMsg = "error in posting the data..." + err;
        id("responseJsonText").value = errMsg;
      });
  }

  //if the request type is get , fetch the data
  else if (requestType === 'get') {
    (async () => {
      try{
      let response = await fetch(url, {
        method: 'get'
      })
      console.log(response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      let text = await response.text();
      console.log(text);
      id("responseJsonText").value = text;
    }
    catch(err){
      id("responseJsonText").value = err;
    }
    })();
  }

  // console.log('URL is ', url);
  // console.log('request type : ', requestType);
  // console.log('content type : ', contentType);



})//submit button event listener ends 


window.addEventListener('load', () => {
  getEl.checked = false;
  postEl.checked = false;
  json.checked = false;
  customParam.checked = false;
  id("responseJsonText").value="";
})