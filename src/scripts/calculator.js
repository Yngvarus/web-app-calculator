class Calculator {
    constructor() {
        this.expression = [];
        this.aboveScreen = " ";
        this.belowScreen = " ";
        this.inputN = " ";
        this.lastOperator = " ";
        this.cpu = new CalculatorCPU();
    }

}