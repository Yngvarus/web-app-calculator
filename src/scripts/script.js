const mainBoardLayout = Object.freeze([
    ["M", "M+", "M-"],
    ["AC", "C", "="],
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['.', '0', '00']
]);

const sOperatorLayout = Object.freeze([
    ['±', '%'],
    ['÷', '√(x)'],
    ['×', '(x)²'],
    ['-', '('],
    ['+', ')'],
]);

function generateKeyboard(mainBoardLayout, sOperatorLayout) {
    const mainBoardElement = document.getElementById('mainBoard');
    const sOperatorBoardElement = document.getElementById('sOperationBoard');

    if (!mainBoardElement || !sOperatorBoardElement) {
        console.error('Elementi della board non trovati');
        return;
    }

    console.log("prima funzione");
    function generateBoard(layout, boardElement) {
        layout.forEach(row => {
            const rowElement = document.createElement('div');
            rowElement.classList.add('row');
            console.log("foreach row");
            row.forEach(key => {
                console.log("foreach key");
                const keyElement = document.createElement('button');
                keyElement.classList.add('key', 'btn');
                keyElement.textContent = key;
                keyElement.setAttribute('data-value', key);

                if (boardElement === sOperatorBoardElement) {
                    keyElement.id = 'sOperation';
                } else if (row.indexOf(key) === 0) {
                    keyElement.id = 'memory';
                } else if (row.indexOf(key) === 1) {
                    keyElement.id = 'function';
                } else {
                    keyElement.id = 'digit';
                }

                rowElement.appendChild(keyElement);
            });
            boardElement.appendChild(rowElement);
        });
    }

    generateBoard(mainBoardLayout, mainBoardElement);
    generateBoard(sOperatorLayout, sOperatorBoardElement);
}

document.addEventListener('DOMContentLoaded', () => {
    generateKeyboard(mainBoardLayout, sOperatorLayout);
    const calculator = new Calculator();
});