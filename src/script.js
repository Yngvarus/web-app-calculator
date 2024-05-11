var mainBoardLayout = [
	["M", "M+", "M-"],
	[ "AC", "C", "="],
	['7', '8', '9'],
	['4', '5', '6'],
	['1', '2', '3'],
];

var sOperatorLayout =[
	['±', '%'],
	['÷', '√(x)'],
	['×', '(x)²'],
	['-', '('],
	['+', ')'],
];

function generateKeyboard(mainBoardLayout, sOperatorLayout) {
    var mainBoardElement = document.getElementById('mainBoard');
    var sOperatorBoardElement = document.getElementById('sOperationBoard');

    function generateBoard(layout, boardElement) {
        layout.forEach(function(row) {
            var rowElement = document.createElement('div');
            rowElement.classList.add('row');

            row.forEach(function(key) {
                var keyElement = document.createElement('button');
                keyElement.classList.add('key');
                keyElement.textContent = key;
                rowElement.appendChild(keyElement);
            });

            boardElement.appendChild(rowElement);
        });
    }

    generateBoard(mainBoardLayout, mainBoardElement);
    generateBoard(sOperatorLayout, sOperatorBoardElement);
}

generateKeyboard(mainBoardLayout, sOperatorLayout);
