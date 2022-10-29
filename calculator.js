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

// --------------------------------------------------------------

const doc_result = document.querySelector("#result");
const doc_trail = document.querySelector("#trail");
let trail = "";

function checkDecimal(input) {
  //Allow only one decimal point per number
  if (input === ".") {
    if (trail != "") {
      let numbers = trail.split(/[\+\-\*\/]/);
      n = numbers[numbers.length - 1];
      if (n.includes(".")) return false;
    }
  }
  return true;
}

function checkEmpty(input) {
  if (trail.length === 0 && (input === "+" || input === "*" || input === "/")) {
    return false;
  }
  return true;
}

function isOperation(input) {
  if (input === "+" || input === "-" || input === "*" || input === "/")
    return true;
  return false;
}

function operationReplace(input) {
  if (trail.length != 0) {
    //Don't allow two operations in succession. Replace last one
    if (input === "+" || input === "-" || input === "*" || input === "/") {
      let last_char = trail.slice(-1);
      if (
        last_char === "+" ||
        last_char === "-" ||
        last_char === "*" ||
        last_char === "/"
      ) {
        trail = trail.slice(0, -1) + input;
        return true;
      }
      else {
        trail += input;
        return true;
      }
    }
  }
  return false;
}

function updateTrail(val) {
  if (trail.length < 26 && checkDecimal(val) && checkEmpty(val)) {
    console.log('trail: ' + trail);
    console.log('input: ' + val);
    console.log('');
    if (!operationReplace(val)) {
      trail += val;
      showTrail();
    }
  }
}

function clearTrail() {
  trail = "";
}

function showTrail() {
  doc_trail.textContent = trail.replaceAll("*", "×");
}

function updateResult(val) {
  let r = eval(doc_trail.textContent.replace("×", "*"));
  r != NaN
    ? (result.textContent = new String(Math.round(r * 10000) / 10000))
    : (result.textContent = 0);
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
    .addEventListener("click", () => updateTrail("*"));
  document
    .querySelector("#btn_div")
    .addEventListener("click", () => updateTrail("/"));

  document
    .querySelector("#btn_dot")
    .addEventListener("click", () => updateTrail("."));
}

initButtons();
