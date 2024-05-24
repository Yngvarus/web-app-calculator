class Calculator {
    constructor() {
        this.expression = [];
        this.aboveScreen = "";
        this.belowScreen = "";
        this.inputN = "";
        this.lastOperator = "";
        this.currentNumber = "";
        this.cpu = new CalculatorCPU();
        this.initEventListeners();
    }

    initEventListeners() {
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.id;
                const value = button.getAttribute('data-value');
                switch (id) {
                    case 'sOperation':
                        this.addOperator(value);
                        break;
                    case 'function':
                        if (value === 'AC') {
                            this.allClear();
                        } else if (value === 'C') {
                            this.inputN = "";
                            this.updateBelowScreen();
                        } else if (value === '=') {
                            this.calculate();
                        }
                        break;
                    case 'digit':
                        this.addNumber(value);
                        break;
                    case 'memory':
                        // Gestire le operazioni di memoria
                        break;
                }
            });
        });
    }

    updateAboveScreen() {
        document.getElementById("upperScreen").value = this.expression.join(" ") || "0";
    }

    updateBelowScreen() {
        document.getElementById("downScreen").value = this.inputN || "0";
    }

    addNumber(number) {
        if (number === "." && this.inputN.includes(".")) {
            return;
        }
        if (number === "0" && this.inputN === "") {
            return;
        }
        this.inputN += number;
        this.updateBelowScreen();
    }

    addOperator(operator) {
        if (this.inputN) {
            this.expression.push(this.inputN, operator);
            this.inputN = "";
        } else if (this.expression.length > 0) {
            this.expression[this.expression.length - 1] = operator;
        }
        this.updateAboveScreen();
        this.updateBelowScreen();
    }

    allClear() {
        this.inputN = "";
        this.lastOperator = "";
        this.expression = [];
        this.updateBelowScreen();
        this.updateAboveScreen();
    }

    calculate() {
        if (this.inputN) {
            this.expression.push(this.inputN);
        }
        const tokens = this.expression.map(token => Token.StringToToken(token));
        const rpn = this.cpu.toRPN(tokens);
        const result = this.cpu.evaluateShuntingYard(rpn);
        this.inputN = result.toString();
        this.expression = [];
        this.updateBelowScreen();
        this.updateAboveScreen();
    }
}
