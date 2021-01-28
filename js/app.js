// Declare all variables
let clearBtn = document.querySelector(".clear");
let date = document.querySelector("#date");
let input = document.querySelector("#input");
let list = document.querySelector("#list");
let time = document.querySelector(".time");
let cursor = document.querySelector(".cursor");
let header = document.querySelector(".header");

// Classes names
let CHECK = "fa-check-circle";
let UNCHECK = "fa-circle-thin";
let LINE_THROUGH = "lineThrough";

// Get random background image
let imgs = ["bg.jpg", "bg1.jpg", "bg2.jpg", "bg.png"];
let random = imgs[Math.floor(Math.random() * imgs.length)]
// Set the random background image
header.style.backgroundImage = `url(img/${random})`

// Local storage
let LIST, id;

// get item from sessionStorage
let data = sessionStorage.getItem("ToDO");

// check if data is not empty
if (data) {
  LIST = JSON.parse(data);
  loadTodo(LIST);
  id = LIST.length;
}
// if data is empty
else {
  LIST = [];
  id = 0
}

// load items to the user's interface
function loadTodo(array) {
  array.forEach(item => {
    addToDo(item.name, item.id, item.done, item.trash, item.time)
  });
}



// clear the local storage
clearBtn.addEventListener("click", function () {
  sessionStorage.clear();
  location.reload();
});

// Show todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

date.innerHTML = today.toLocaleDateString("en-US", options);


// Creat add toDo function
function addToDo(toDo, id, done, trash, time) {
  // If the element is deleted
  if (trash) return;

  // To check and uncheck the element
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  // Add new todo in the list
  const text = `<li class="item">
      <i class="fa ${DONE} co" job="complete" id="${id}"></i>
      <p class="text ${LINE}">${toDo}</p>
      <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
      <div class="todo-time ${LINE}"> ${time} </div>
                </li>
`;
  // postion of added todo
  const position = "beforeend";

  // add todo to ower list
  list.insertAdjacentHTML(position, text);

  // list.addEventListener("click", (ev) => {

  //   let jsPars = JSON.parse(sessionStorage.getItem("ToDO"));
  //   for (let i = 0; i < jsPars.length; i++) {
  //     // get todo from local storage
  //     let a = jsPars[i].name
  //     // todo equal input value
  //     if (ev.target.innerHTML == a) console.log("rt")

  //   }
  //   let pr = prompt("new")
  //   ev.target.innerHTML = pr;
  // })
};

// Run Adding todo function while press enter
document.addEventListener("keyup", (event) => {
  if (event.keyCode == 13) addingTODO();
});

// Run Adding todo function while clicking on plus button
cursor.onclick = addingTODO;

// Adding todo function
function addingTODO() {
  // take the todo entered
  let toDo = input.value;
  //conver to number
  let r = +toDo

  // if the input contain a number
  if (!isNaN(r)) {
    alert("The input musn't contains a number");
    input.value = ""
    return;
  }

  // if the input includes symboles in the first
  let symboles = [".", ",", ";", ",", "?", "/", "!", "§", "%", "µ", "*", "^"];

  // loop in syomboles
  symboles.forEach(e => {
    if (toDo[0].includes(e)) {
      alert("The input musn't start with symbole");

      // input.value = "";
      // return;
    }
  })

  // if the input is empty
  if (!toDo) alert("The input field is empty !")
  // if the input !empty
  if (toDo) {
    // check if the todo is already on the LIST
    if (sessionStorage.length != 0) {
      let jsPars = JSON.parse(sessionStorage.getItem("ToDO"));

      if (jsPars) {
        for (let i = 0; i < jsPars.length; i++) {
          // get todo from local storage
          let a = jsPars[i].name
          // todo equal input value
          if (toDo == a) {
            alert("The todo is already in the list");
            input.value = "";
            return;
          }
        }
      }
    }

    // run Addtodo function
    addToDo(toDo, id, false, false, time.value);

    if (time == undefined) {
      time.value = ""
    }


    // store the todo in LIST
    LIST.push(
      {
        name: toDo,
        id: id,
        done: false,
        trash: false,
        time: time.value
      }
    );
    // add item to sessionStorage ( this code must be added where the LIST array is updated)
    sessionStorage.setItem("ToDO", JSON.stringify(LIST));

    // increase the id by 1
    id++;
  }
  // resut the values
  input.value = "";
  time.value = ""
}

// if the todo is completed
function completedTodo(element) {
  // toggle the check and the uncheck class
  element.classList.toggle(CHECK)
  element.classList.toggle(UNCHECK)
  // add line trough
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
  element.parentNode.querySelector(".todo-time").classList.toggle(LINE_THROUGH);
  // if done is true = false else !=
  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Remove todo from the list
function removeTodo(element) {
  // element.parentNode.parentNode.removeChild(element.parentNode);
  element.parentNode.remove();
  LIST[element.id].trash = true;
}

// targeting to todo elements
list.addEventListener("click", (event) => {
  let element = event.target
  try {
    const elementJOB = element.attributes.job.value; // complete / delete
    if (elementJOB == "complete") completedTodo(element)
    else if (elementJOB == "delete") removeTodo(element)
  }
  catch (err) {
    return
  }

  // add item to sessionStorage ( this code must be added where the LIST array is updated)
  sessionStorage.setItem("ToDO", JSON.stringify(LIST));
})