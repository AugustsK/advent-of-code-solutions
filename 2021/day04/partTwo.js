const { getInput, strToLines, lineToArr, lineToIntArr } = require('../../utils/input');
const { outResult, outDebug } = require('../../utils/output');

const lines = strToLines(getInput());
const numbers = lineToIntArr(lines.shift())
let boards = [];
let winningBoards = new Set();
let winningSum;

while (lines.length > 0) {
    lines.shift();
    boards.push(lines.splice(0, 5));
}

const bingoRow = board => {
    return board.some(line => line.filter(obj => obj.marked === true).length === 5);
}

const bingoColumn = board => {
    const columns = [];

    for (let i = 0; i < 5; i++) {
        columns.push(board.map(line => line[i]));
    }

    return bingoRow(columns);
}

boards = boards.map(
    board => board.map(
        line =>
            line.split(' ')
                .filter(item => item !== '')
                .map(
                    number => ({
                        value: parseInt(number, 10),
                        marked: false
                    })
                )
    )
);

numbers.forEach(num => {
    boards.forEach((board, boardIndex) => {
        board.forEach(line => {
            line.forEach(obj => {
                if (obj.value === num) {
                    obj.marked = true;
                }
            });
        });

        if (bingoRow(board) || bingoColumn(board)) {
            if (!winningBoards.has(boardIndex)) {
                winningBoards.add(boardIndex);

                if (winningBoards.size === boards.length) {
                    winningSum = 0;

                    board.forEach(line => {
                        line.filter(num => !num.marked).forEach(num => winningSum += num.value);
                    });

                    winningSum *= num;
                }
            }
        }
    });
});

outResult(winningSum);
