let currentInput = '0';
let previousInput = '';
let operator = null;

const currentOperandEl = document.getElementById('current-operand');
const previousOperandEl = document.getElementById('previous-operand');

function updateDisplay() {
  currentOperandEl.innerText = currentInput;
  if (operator != null) {
    previousOperandEl.innerText = `\({previousInput}\){getSymbol(operator)}`;
  } else {
    previousOperandEl.innerText = '';
  }
}

function getSymbol(op) {
  if (op === '/') return '÷';
  if (op === '*') return '×';
  return op;
}

function appendNumber(number) {
  if (number === '.' && currentInput.includes('.')) return;
  if (currentInput === '0' && number !== '.') {
    currentInput = number;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

function appendOperator(op) {
  if (currentInput === '' && previousInput === '') return;
  if (previousInput !== '' && currentInput !== '') {
    calculate();
  }
  operator = op;
  previousInput = currentInput;
  currentInput = '0';
  updateDisplay();
}

function clearAll() {
  currentInput = '0';
  previousInput = '';
  operator = null;
  updateDisplay();
}

function deleteNumber() {
  if (currentInput.length === 1) {
    currentInput = '0';
  } else {
    currentInput = currentInput.slice(0, -1);
  }
  updateDisplay();
}

function calculate() {
  let computation;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '/':
      if (current === 0) {
        alert("Cannot divide by zero");
        clearAll();
        return;
      }
      computation = prev / current;
      break;
    default:
      return;
  }

  currentInput = computation.toString();
  operator = null;
  previousInput = '';
  updateDisplay();
}

// Keyboard Controls
window.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
    appendNumber(e.key);
  } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
    appendOperator(e.key);
  } else if (e.key === 'Enter' || e.key === '=') {
    e.preventDefault();
    calculate();
  } else if (e.key === 'Backspace') {
    deleteNumber();
  } else if (e.key === 'Escape') {
    clearAll();
  }
});