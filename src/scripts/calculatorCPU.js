class CalculatorCPU {
    constructor() {}

    toRPN(tokens) {
        const output = [];
        const operatorStack = [];

        tokens.forEach(token => {
            if (token.tokenType === Token.TokenType.NUM) {
                output.push(token);
            } else if (token.tokenType === Token.TokenType.OPT) {
                while (operatorStack.length &&
                    operatorStack[operatorStack.length - 1].precedence >= token.precedence) {
                    output.push(operatorStack.pop());
                }
                operatorStack.push(token);
            } else if (token.tokenType === Token.TokenType.LBR) {
                operatorStack.push(token);
            } else if (token.tokenType === Token.TokenType.RBR) {
                while (operatorStack.length && operatorStack[operatorStack.length - 1].tokenType !== Token.TokenType.LBR) {
                    output.push(operatorStack.pop());
                }
                operatorStack.pop(); // Rimuovi la parentesi sinistra dalla pila
            }
        });

        while (operatorStack.length) {
            output.push(operatorStack.pop());
        }

        return output;
    }

    evaluateShuntingYard(tokens) {
        const stack = [];

        tokens.forEach(token => {
            if (token.tokenType === Token.TokenType.NUM) {
                stack.push(token.value);
            } else if (token.tokenType === Token.TokenType.OPT) {
                const params = [];
                for (let i = 0; i < token.parameterCount; i++) {
                    params.unshift(stack.pop());
                }
                switch (token.symbol) {
                    case '+':
                        stack.push(params[0] + params[1]);
                        break;
                    case '-':
                        stack.push(params[0] - params[1]);
                        break;
                    case '×':
                        stack.push(params[0] * params[1]);
                        break;
                    case '÷':
                        stack.push(params[0] / params[1]);
                        break;
                    case '±':
                        // Gestire il caso ±
                        break;
                    case '√(x)':
                        stack.push(Math.sqrt(params[0]));
                        break;
                    case '(x)²':
                        stack.push(params[0] ** 2);
                        break;
                    default:
                        throw new Error("Invalid operator: " + token.symbol);
                }
            }
        });
        return stack.pop();
    }
}
