import { pseudoRandomBytes } from "crypto";

//import { checkForName } from './js/nameChecker'
//import { handleSubmit } from './js/formHandler'
//import { buildPage } from './js/pageBuilder.js'

//import './styles/resets.scss'
//import './styles/base.scss'
//import './styles/form.scss'
//import './styles/footer.scss'
//import './styles/header.scss'

//console.log(checkForName);

function buildForm() {
  var element = document.createElement("div");
  var input = document.createElement("textarea");
  var button = document.createElement("button");
  var result = document.createElement("div");
  element.appendChild(input);
  element.appendChild(button);
  element.appendChild(result);
  input.value = "write some junk here";
  result.innerHTML = "Result goes here";
  button.innerText = "Submit";
  button.addEventListener("click", async e => {
    result.innerHTML = await request(input.value);
  });
  return element;
}

async function getResult(text) {
  return await fetch("/sentiment", {
    method: "post",
    body: JSON.stringify({ text: text })
  }).then(res => res.text());
}

async function request(text) {
    try {
      const response = await fetch('http://localhost:8080/sentiment',
        {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: text })
        });
      if (response.ok) {
        return await response.text();
      }
    } catch (error) {
      console.log(error);
    }
  }

document.body.appendChild(buildForm());

