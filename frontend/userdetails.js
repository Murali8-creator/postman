import { id } from './script.js';

const url = "http://localhost:8080/users/login";
const signinBox = id("signin");
const signinBtnElement = id("signInButton");
let data = {};

signinBtnElement.addEventListener('click', () => {
  data = {};
  const emailElement = id("email");
  const passwordElement = id("password");
  console.log(emailElement.value);
  console.log(passwordElement.value);

  data["userEmail"] = emailElement.value;
  data["password"] = passwordElement.value;


  console.log(data);
  data = JSON.stringify(data);
  console.log("after converting to string", data);


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

  // signinBox.setAttribute('data-bs-dismiss', 'modal');
})




