const mainBoardLayout = Object.freeze([
	["M", "M+", "M-"],
	[ "AC", "C", "="],
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
    var mainBoardElement = document.getElementById('mainBoard');
    var sOperatorBoardElement = document.getElementById('sOperationBoard');

    function generateBoard(layout, boardElement) {
        for (let rowIndex = 0; rowIndex < layout.length; rowIndex++) {
            const row = layout[rowIndex];
            var rowElement = document.createElement('div');
            rowElement.classList.add('row');

            row.forEach(function(key) {
                var keyElement = document.createElement('button');
                keyElement.classList.add('key');
                keyElement.textContent = key;
                keyElement.setAttribute('data-value', key);

                if (boardElement === sOperatorBoardElement) {
                    keyElement.id = 'sOperation';
                } else if (rowIndex === 0) {
                    keyElement.id = 'memory';
                } else if (rowIndex === 1) {
                    keyElement.id = 'function';
                } else {
                    keyElement.id = 'digit';
                }

                rowElement.appendChild(keyElement);
            });

            boardElement.appendChild(rowElement);
        }
    }

    generateBoard(mainBoardLayout, mainBoardElement);
    generateBoard(sOperatorLayout, sOperatorBoardElement);
}

generateKeyboard(mainBoardLayout, sOperatorLayout);

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const id = button.getElementId();
        switch(id) {
            case 'sOperation':
                break;
            case 'function':
                break;
            case 'digit':
                break;
            case 'memory':
                break;
        }
    });
});