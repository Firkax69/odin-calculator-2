// create class calculator
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear(); 
    }
    // List of operations our calculator can perform

    clear() {
        // gonna clear out our different vatiables
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete() {
        // delete function for removing a single number from the end
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        // what's gonna happen when user clicks on a 
        // number to add to the screen(we need to pass the number
        // the user selected)
        // 2: to String because JS will try to add these as actual numbers
        // we wanna our numbers to be appended and not added.
        if (number === "." && this.currentOperand.includes(".")) return
        // if we type period key & we already have a period key we just 
        // wanna return, which will stop our function from executing
        //  any further and we won't actually append to that number
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        // To check that operation didn't go thru and actually select last operation clicked
        if (this.currentOperand === "") return
        // when you click operation again, it make sure it'll do compute of current and previous values
        // and put it all over of our value to previousOperand 
        if (this.previousOperand !== "") {
            this.compute();
        }
        // gonna happen every time a user clicks on one of the operations
        // gonna need to take the particular operation, that user selected
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        // take our values inside of calculator and compute a single 
        // value for what we need to display on the calculator
        let computation // will be the result of our compute func
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        // we don't want code actually run if user doesn't enter anything and press equal(=)
        if (isNaN(prev) || isNaN(current)) return 
        // switch because we want to bunch of it statements on one object
        switch (this.operation) {
            case "+":
                computation = prev + current;
                break
            case "-":
                computation = prev - current;
                break
            case "*":
                computation = prev * current;
                break
            case "/":
                computation = prev / current;
                break
            default:
                return // we don't wanna do any computation if none of calculator symbols match our operation
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        // below takes out string and turn this into array
        // right below retirns first part of array a string before period
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        // returns string! because we do no need a number after period 
        const decimalDigits = stringNumber.split(".")[1];

        let integerDisplay
        if (isNaN(integerDigits)) {
            // if  nothing was inputet
            integerDisplay = ""; 
        } else {
            // to make sure we do not have any decimal places after that
            integerDisplay = integerDigits.toLocaleString("en", {maximumFractionDigits: 0})
        }
        if (decimalDigits != null) { //means that user did enter period and has some numbers after it
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        // this is going update the values inside of our output 
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ""; // if equal pressed it is gonna clear out previous value
        }
    }
}

// We select data attributes which must be inside brackets
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        // add a number of whatever is inside that clicked button
        calculator.updateDisplay();
        // our display values will be constantly updated everytime we click on the button
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

// Let's work on computation
equalsButton.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener("click", button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})