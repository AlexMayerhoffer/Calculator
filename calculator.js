function add(a = 0, b = 0) {
  return a + b;
}

function subtract(a = 0, b = 0) {
  return a - b;
}

function multiply(a = 0, b = 0) {
  return a * b;
}

function divide(a = 0, b = 1) {
  if (b != 0) {
    return a / b;
  } else return null;
}

function operate(operator, a, b) {
  let result = null;
  switch (operator) {
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = subtract(a, b);
      break;
    case "*":
      result = multiply(a, b);
      break;
    case "/":
      result = divide(a, b);
      break;
    default:
      break;
  }
  return result;
}

const trail = document.querySelector("#trail");

function inputCheck(current_trail, input) {
  //Change from '×' to '*'
  input = input.replace("×", "*");
  current_trail = current_trail.replaceAll("×", "*");

  //Don't allow two operations in succession
  if (
    input === "+" ||
    input === "-" ||
    input === "*" ||
    input === "/"
  ) {
    let last_char = current_trail.slice(-1);
    if (
      last_char === "+" ||
      last_char === "-" ||
      last_char === "*" ||
      last_char === "/"
    )
      return false;
  }

  //Allow only one decimal point per number
  if (input === ".") {
    if(current_trail != '') {
    let numbers = current_trail.split(/[\+\-\*\/]/);
    n = numbers[numbers.length-1];
    if(n.includes('.'))
      return false;
    }
  }

  return true;
}

function updateTrail(val) {
  if (trail.textContent.length < 26 && inputCheck(trail.textContent, val))
    trail.textContent += val;
}

function clearTrail() {
  trail.textContent = "";
}

function updateResult(val) {
  const result = document.querySelector("#result");
  let r = eval(trail.textContent.replace("×", "*"));
  r != NaN
    ? result.textContent = new String(Math.round(r * 10000) / 10000)
    : result.textContent = 0;
  clearTrail();
}

function initButtons() {
  for (index = 0; index < 10; index++) {
    let btn = document.querySelector(`#btn_${index}`);
    btn.addEventListener("click", (e) => {
      updateTrail(e.target.id.replace("btn_", ""));
    });
  }
  document
    .querySelector("#btn_equ")
    .addEventListener("click", () => updateResult());

  document
    .querySelector("#btn_add")
    .addEventListener("click", () => updateTrail("+"));
  document
    .querySelector("#btn_sub")
    .addEventListener("click", () => updateTrail("-"));
  document
    .querySelector("#btn_mul")
    .addEventListener("click", () => updateTrail("×"));
  document
    .querySelector("#btn_div")
    .addEventListener("click", () => updateTrail("/"));

  document
    .querySelector("#btn_dot")
    .addEventListener("click", () => updateTrail("."));
}

initButtons();
