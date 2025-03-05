// Math operation functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Cannot divide by zero";
  }
  return a / b;
}

// New operate function
function operate(operator, a, b) {
  switch (operator) {
    case "add":
      return add(a, b);
    case "subtract":
      return subtract(a, b);
    case "multiply":
      return multiply(a, b);
    case "divide":
      return divide(a, b);
    default:
      return null;
  }
}

// Variables to store the parts of the calculator operation
let firstNumber = "";
let operator = "";
let secondNumber = "";

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const { id } = button;

    if (id === "clear") {
      firstNumber = "";
      operator = "";
      secondNumber = "";
      display.innerText = "0";
    } else if (id === "backspace") {
      if (operator) {
        secondNumber = secondNumber.slice(0, -1);
        display.innerText = secondNumber || "0";
      } else {
        firstNumber = firstNumber.slice(0, -1);
        display.innerText = firstNumber || "0";
      }
    } else if (id === "equals") {
      if (operator && firstNumber && secondNumber) {
        const result = operate(
          operator,
          parseFloat(firstNumber),
          parseFloat(secondNumber)
        );
        display.innerText = result;
        firstNumber = result.toString();
        operator = "";
        secondNumber = "";
      }
    } else if (["add", "subtract", "multiply", "divide"].includes(id)) {
      if (firstNumber && !operator) {
        operator = id;
      }
    } else {
      if (operator) {
        secondNumber += button.innerText;
        display.innerText = secondNumber;
      } else {
        firstNumber += button.innerText;
        display.innerText = firstNumber;
      }
    }
  });
});
