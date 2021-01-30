function getHistory() {
    return document.getElementById('history-value').innerText;
}
function printHistory(num) {
    document.getElementById('history-value').innerText = num;
}
function getOutput() {
    return document.getElementById('output-value').innerText;
}
function printOutput(num) {
    if (num == '') {
        document.getElementById('output-value').innerText = num;
    } else {
        document.getElementById('output-value').innerText = getFormatNumber(num);
    }
}
// format number
function getFormatNumber(num) {
    let n = Number(num);
    let value = n.toLocaleString("en");
    return value;
}
// normal number
function getNormalNumber(num) {
    return Number(num.replace(/,/g, ""));
}

let history;
// number value
let number = document.getElementsByClassName('number');
for (let i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function () {
        history = getHistory();
        history += this.id;
        printHistory(history);
    })
}
// operator value
let operator = document.getElementsByClassName('operator');
for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function () {
        if (this.id == "clear") {
            printHistory('');
            printOutput('');
        } else if (this.id == "backspace") {
            history = getHistory();
            history = history.substr(0, history.length - 1);
            printHistory(history);
            printOutput('');
        } else if (this.id == "=") {
            history = getHistory();
            let result = eval(history);
            if (result.toString().length <= 16) {
                printOutput(result);
                printHistory(history + " =");
            } else {
                alert('This is too much for this little calculator. Your number is very large.')
            }
        } else {
            let output = getOutput();
            history = getHistory()
            if (output) {
                history = getNormalNumber(output) + this.id;
                printHistory(history);
            } else if (history == "") {
                printHistory("");
            } else if (isNaN(history[history.length - 1])) {
                history = history.substr(0, history.length - 1) + this.id;
                printHistory(history);
            } else {
                history += this.id;
                printHistory(history);
            }
        }
    })
}