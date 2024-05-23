const sOperatorLayout = Object.freeze([
	['±', '%'],
	['÷', '√(x)'],
	['×', '(x)²'],
	['-', '('],
	['+', ')'],
]);

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
        UNARY: Symbol("unary")
    });

    constructor(type) {
        this.tokenType = type;
    }

    static StringToToken(str) {
        if (!isNaN(parseFloat(str))) {
            // Se è un numero
            return new numToken(parseFloat(str));
        } else if (OptToken.bracket.includes(str) || sOperatorLayout.includes(str)) {
            // Se è un operatore o una parentesi
            return new OptToken(str);
        } else {
            throw new Error("Invalid token string: " + str);
        }
    }
}


class numToken extends Token {
    constructor(value){
        super(Token.TokenType.NUM);
        this.value = value;
    }

}

class OptToken extends Token {
    static bracket = Object.freeze(["(", ")", "[", "]"]);
    
    constructor(symbol) {

        if (OptToken.bracket.includes(symbol)) {
            for(let i=0; i < OptToken.bracket.length; i++) {
                if(i%2==0){
                    if(OptToken.bracket[i] === symbol){
                        super(Token.TokenType.LBR);
                    }

                } else{
                    if(OptToken.bracket[i] === symbol){
                        super(Token.TokenType.RBR);
                    }
                }
            }
            this.symbol = symbol;
        } else {
            super(Token.TokenType.OPT);

            this.symbol = symbol;
        
            switch(symbol){
                case '±':
                    this.assoc = Token.TokenAssociativity.UNARY;
                    this.precedence = 14;
                    this.parameterCount = 1;
                    break;
                case '÷':
                    this.assoc = Token.TokenAssociativity.LEFT;
                    this.precedence = 12;
                    this.parameterCount = 2;
                    break;
                case '×':
                    this.assoc = Token.TokenAssociativity.LEFT;
                    this.precedence = 12;
                    this.parameterCount = 2;
                    break;
                case '-':
                    this.assoc = Token.TokenAssociativity.LEFT;
                    this.precedence = 11;
                    this.parameterCount = 2;
                    break;
                case '+':
                    this.assoc = Token.TokenAssociativity.LEFT;
                    this.precedence = 11;
                    this.parameterCount = 2;
                    break;
                case '%':
                    break;
                case '√(x)':
                    this.assoc = Token.TokenAssociativity.UNARY;
                    this.precedence = 13;
                    this.parameterCount = 1;
                    break;
                case '(x)²':
                    this.assoc = Token.TokenAssociativity.UNARY;
                    this.precedence = 13;
                    this.parameterCount = 1;
                    break;
                case '(':
                    break;
                case ')':
                    break;
            }
        }

    }
}

