const digitMap = {
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

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
    return "Can't divide by zero!";
  }
  return a / b;
}

// operate function
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

let displayValue = "0";
let firstNumber = "";
let operator = "";
let secondNumber = "";
let shouldResetDisplay = false;

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

function updateDisplay(value) {
  display.innerText = value;
}

function handleButtonClick(btnValue) {
  if (digitMap.hasOwnProperty(btnValue)) {
    btnValue = digitMap[btnValue];
  }

  if (btnValue === "clear") {
    displayValue = "0";
    firstNumber = "";
    operator = "";
    secondNumber = "";
    shouldResetDisplay = false;
    updateDisplay(displayValue);
  } else if (btnValue === "backspace") {
    if (!shouldResetDisplay) {
      displayValue = displayValue.slice(0, -1) || "0";
      updateDisplay(displayValue);
      if (operator) {
        secondNumber = displayValue;
      } else {
        firstNumber = displayValue;
      }
    }
  } else if (btnValue === "equals") {
    if (operator && firstNumber && secondNumber) {
      const result = operate(
        operator,
        parseFloat(firstNumber),
        parseFloat(secondNumber)
      );

      displayValue =
        result.toString().length > 10 ? parseFloat(result.toFixed(10)) : result;
      firstNumber = displayValue;
      operator = "";
      secondNumber = "";
      shouldResetDisplay = true;
      updateDisplay(displayValue);
    }
  } else if (["add", "subtract", "multiply", "divide"].includes(btnValue)) {
    if (firstNumber && operator && secondNumber) {
      firstNumber = operate(
        operator,
        parseFloat(firstNumber),
        parseFloat(secondNumber)
      ).toString();
      displayValue = firstNumber;
      updateDisplay(displayValue);
      secondNumber = "";
    }
    if (firstNumber) {
      operator = btnValue;
      shouldResetDisplay = true;
    }
  } else if (btnValue === "decimal") {
    if (!displayValue.includes(".")) {
      displayValue += ".";
      if (operator) {
        secondNumber = displayValue;
      } else {
        firstNumber = displayValue;
      }
      updateDisplay(displayValue);
    }
  } else {
    if (shouldResetDisplay) {
      displayValue = btnValue;
      shouldResetDisplay = false;
    } else {
      displayValue = displayValue === "0" ? btnValue : displayValue + btnValue;
    }

    if (operator) {
      secondNumber = displayValue;
    } else {
      firstNumber = displayValue;
    }
    updateDisplay(displayValue);
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    handleButtonClick(button.id);
  });
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (!isNaN(key)) {
    handleButtonClick(key);
  } else if (key === "+") {
    handleButtonClick("add");
  } else if (key === "-") {
    handleButtonClick("subtract");
  } else if (key === "*") {
    handleButtonClick("multiply");
  } else if (key === "/") {
    handleButtonClick("divide");
  } else if (key === "=" || key === "Enter") {
    handleButtonClick("equals");
  } else if (key === "Backspace") {
    handleButtonClick("backspace");
  } else if (key.toLowerCase() === "c") {
    handleButtonClick("clear");
  } else if (key === ".") {
    handleButtonClick("decimal");
  }
});
