/* GET DOM ELEMENTS */
const num1Input = document.getElementById("num1");
const num2Input = document.getElementById("num2");
const resultDisplay = document.getElementById("result-text");
const resultContainer = document.querySelector(".result");

const addBtn = document.getElementById("add");
const subtractBtn = document.getElementById("subtract");
const multiplyBtn = document.getElementById("multiply");
const divideBtn = document.getElementById("divide");
const clearBtn = document.getElementById("clear");
const historyList = document.getElementById("history");
const clearHistoryBtn = document.getElementById("clear-history");

// History array
let operationHistory = [];

/* HELPER FUNCTIONS */
/**
 * Get input values and convert to numbers
 * @returns {Object} Object with num1 and num2 properties
 */
function getInputValues() {
  const num1 = parseFloat(num1Input.value);
  const num2 = parseFloat(num2Input.value);
  return { num1, num2 };
}

/**
 * Validate if both inputs are valid numbers
 * @param {number} num1 - First number
 * @param {number} num2 = Second number
 * @returns {boolean} True if both numbers are valid
 */
function validateInputs(num1, num2) {
  if (isNaN(num1) || isNaN(num2)) {
    displayResult("Error: Please enter valid numbers", "error");
    return false;
  }
  return true;
}

/**
 * Display result with styling
 * @param {string|number} message - Result message or number
 * @param {string} type - 'success' or 'error'
 */
function displayResult(message, type = "success") {
  resultDisplay.textContent = message;

  // Remove existing state classes
  resultContainer.classList.remove("error", "success");

  // Add new state class
  if (type === "error") {
    resultContainer.classList.add("error");
  } else {
    resultContainer.classList.add("success");
  }
}

/**
 * Clear all inputs and result
 */
function clearCalculator() {
  num1Input.value = "";
  num2Input.value = "";
  resultDisplay.textContent = "Result: -";
  resultContainer.classList.remove("error", "success");

  // Focus on first input
  num1Input.focus();
}

/* OPERATION FUNCTIONS */
/**
 * Add two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
function add(a, b) {
  return a + b;
}

/**
 * Subtract two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
function subtract(a, b) {
  return a - b;
}

/**
 * Multiply two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
function multiply(a, b) {
  return a * b;
}

/**
 * Divide two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
function divide(a, b) {
  if (b === 0) {
    return "Error: Cannot divide by zero";
  }
  return a / b;
}

console.log("Calculator script loaded successfully");

/* EVENT LISTENERS */
/**
 * Handle addition operation
 */
addBtn.addEventListener("click", () => {
  const { num1, num2 } = getInputValues();

  if (!validateInputs(num1, num2)) return;

  const result = add(num1, num2);
  displayResult(`Result: ${result}`, "success");
  addToHistory(num1, "+", num2, result);
});

/**
 * Handle subtraction operation
 */
subtractBtn.addEventListener("click", () => {
  const { num1, num2 } = getInputValues();

  if (!validateInputs(num1, num2)) return;

  const result = subtract(num1, num2);
  displayResult(`Result: ${result}`, "success");
  addToHistory(num1, "-", num2, result);
});

/**
 * Handle multiplication operation
 */
multiplyBtn.addEventListener("click", () => {
  const { num1, num2 } = getInputValues();

  if (!validateInputs(num1, num2)) return;

  const result = multiply(num1, num2);
  displayResult(`Result: ${result}`, "success");
  addToHistory(num1, "x", num2, result);
});

/**
 * Handle division operation
 */
divideBtn.addEventListener("click", () => {
  const { num1, num2 } = getInputValues();

  if (!validateInputs(num1, num2)) return;

  const result = divide(num1, num2);
  // Check if result is error message (divide by zero)
  if (typeof result === "string") {
    displayResult(result, "error");
  } else {
    displayResult(`Result: ${result}`, "success");
    addToHistory(num1, "÷", num2, result);
  }
});

/**
 * Handle clear operation
 */
clearBtn.addEventListener("click", () => {
  clearCalculator();
});

/**
 * Handle Enter key press
 */
document.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addBtn.click();
  }
});

/**
 * Add operation to history
 * @param {number} num1 - First number
 * @param {string} operator - Operation symbol
 * @param {number} num2 - Second number
 * @param {number|string} result - Result or error message
 */
function addToHistory(num1, operator, num2, result) {
  // Don't add errors to history
  if (typeof result === "string" && result.includes("Error")) {
    return;
  }

  // Format the entry
  const entry = `${num1} ${operator} ${num2} = ${result}`;
  operationHistory.push(entry);

  updateHistoryDisplay();
}

/**
 * Update history display
 */
function updateHistoryDisplay() {
  if (operationHistory.length === 0) {
    historyList.innerHTML = '<p class="history-empty">No calculations yet</p>';
    return;
  }

  const recentHistory = operationHistory.slice(-10).reverse();
  historyList.innerHTML = recentHistory
    .map((entry) => `<p>${entry}</p>`)
    .join("");
}

/**
 * Clear history
 */
function clearHistory() {
  operationHistory = [];
  updateHistoryDisplay();
}

/**
 * Handle clear history operation
 */
clearHistoryBtn.addEventListener("click", () => {
  clearHistory();
});
