class Token {

    static TokenType = Object.freeze({
        NUM: Symbol("num"),
        OPT: Symbol("opt"),
        LBR: Symbol("lbr"),
        RBR: Symbol("rbr"),
        NOT: Symbol("not"),
    });

    static TokenAssociativity = Object.freeze({
        LEFT: Symbol("left"),
        RIGHT: Symbol("right"),
    });

    constructor() {
        this.tokenType = Token.TokenType.NOT;
        this.value = 0.0;
        this.symbol = " ";
        this.assoc = Token.TokenAssociativity.RIGHT;
        this.precedence = 0;
        this.parameterCount = 0;
    }

    static StringToToken(str) {
        if (!isNaN(parseFloat(str))) {
            //number
        } else {
            //else
        }
    }

}

class Calculator {
    constructor() {
        this.expression = [];
        this.aboveScreen = " ";
        this.belowScreen = " ";
        this.inputN = " ";
        this.lastOperator = " ";
    }
}