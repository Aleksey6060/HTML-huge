let lastOperation = '';
let previousResult = null;

function insert(value) {
    const display = document.getElementById("display");
    if (display.value === '0' || display.value === previousResult) {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    document.getElementById("display").value = '0';
}

function operation(op) {
    const display = document.getElementById("display");
    if (op === 'sqrt()') {
        display.value = `Math.sqrt(${display.value})`;
    } else if (op === 'pow') {
        lastOperation = `Math.pow(${display.value}, `;
        display.value = lastOperation;
    } else if (op === 'log') {
        display.value = `Math.log(${display.value})`;
    } else if (op === 'sin') {
        display.value = `Math.sin(${display.value})`;
    } else if (op === 'cos') {
        display.value = `Math.cos(${display.value})`;
    } else if (op === 'tan') {
        display.value = `Math.tan(${display.value})`;
    } else if (op === '%') {
        display.value = `${display.value} / 100`;
    } else {
        lastOperation = `${display.value} ${op} `;
        display.value = lastOperation;
    }
}

function calculate() {
    const display = document.getElementById("display");
    try {
        previousResult = eval(display.value);
        display.value = previousResult;
    } catch (e) {
        display.value = 'Ошибка';
    }
}