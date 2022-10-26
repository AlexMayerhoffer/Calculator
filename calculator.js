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

const trail = document.querySelector('#trail');

function updateTrail(val) {
  if(trail.textContent.length < 26)
    trail.textContent += val;
}

function clearTrail() {
  trail.textContent = "";
}

function updateResult(val) {
  const result = document.querySelector("#result");
  result.textContent = eval(trail.textContent.replace('×','*'));
  clearTrail();
}

function initButtons() {
  for (index = 0; index < 10; index++) {
    let btn = document.querySelector(`#btn_${index}`);
    btn.addEventListener("click", (e) => {
      updateTrail(e.target.id.replace("btn_", ""));
    });
  }
  document.querySelector('#btn_equ').addEventListener('click', () => updateResult());

  document.querySelector('#btn_add').addEventListener('click', () => updateTrail('+'));
  document.querySelector('#btn_sub').addEventListener('click', () => updateTrail('-'));
  document.querySelector('#btn_mul').addEventListener('click', () => updateTrail('×'));
  document.querySelector('#btn_div').addEventListener('click', () => updateTrail('/'));
  
  document.querySelector('#btn_dot').addEventListener('click', () => updateTrail('.'));
}






initButtons();
