// Initial Game

var cards = document.querySelectorAll('.player-card');
var blocks = document.querySelectorAll('.table-block')
var isWin = false;
// var board = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",];
var board = Array.from(Array(16).keys());
var deck = [
    `<i id="hydro" class="bi bi-droplet-fill"></i>`,
    `<i id="pyro" class="bi bi-fire"></i>`,
    `<i id="dendro" class="bi bi-tree-fill"></i>`,
    `<i id="animo" class="bi bi-tropical-storm"></i>`
];
var selected_elemental;
var cach_elemental;
var turn_count = 1;
var huPlayer = `Human`;
var aiPlayer = `AI`;
var player_turn = huPlayer;
const winCombo = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    // vertical
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    // diaganal
    [0, 5, 10, 15],
    [3, 6, 9, 12]
];

StartGame();

function StartGame() {

    for (let card of cards) {
        card.onclick = (event) => {
            let target_element = event.currentTarget;
            console.log(target_element);
            cach_elemental = target_element;
            selected_elemental = target_element.innerHTML;
            console.log(`You choose : ${target_element.innerHTML}`);
            console.log(`Cach Elemental : ${cach_elemental}`);
        }
    }

    for (let block = 0; block < blocks.length; block++) {
        let temp = 0;
        let field = blocks[block];

        field.onclick = (event) => {
            if (isWin == false) {
                turn();
                if (temp < 3) {
                    // Is a block is empty?
                    if (event.currentTarget.hasChildNodes()) {
                        // Replace Elemental
                        if (CanReplaceField(field, cach_elemental)) {
                            console.log("Can Replace");
                            event.currentTarget.removeChild(field.lastChild);
                            event.currentTarget.innerHTML = selected_elemental;
                            AddResultToArray(field);
                            // Set a selected elemental to non-selected.
                            selected_elemental = undefined;
                            cach_elemental.innerHTML = "";
                            DrawCardAndEndPhase();
                            turn_count += 1;
                        } else if (!CanReplaceField(field, cach_elemental)) {
                            temp -= 1;
                        }
                    } else {
                        if (selected_elemental !== undefined) {
                            event.currentTarget.innerHTML = selected_elemental;
                            console.log(field)
                            AddResultToArray(field);
                            selected_elemental = undefined;
                            cach_elemental.innerHTML = "";
                            DrawCardAndEndPhase();
                            turn_count += 1
                        } else if (selected_elemental === undefined) {
                            temp -= 1;
                        }
                    }
                    temp += 1;
                    console.log(`temp : ${temp}`);
                } else {
                    console.log("You has use all quota");
                }
            }
            CheckWin(board, player_turn);
            CheckResult(); // if (CheckResult()) {Player||Com Win} else {turn + 1}
        };
    }
}


// Add a result into board (Array)
function AddResultToArray(btn) {
    board[btn.id - 1] = selected_elemental;
    console.log(board);
}

// Game Logic Component
function CheckResult() {
    CheckResultFromHorizontal();
    CheckResultFromVertical();
    CheckResultFromDiaganal();
    CheckDrawResult();
}

function CheckWin(input_board, player) {
    let plays = input_board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombo.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = { index: index, player: player };
            break;
        }
    }
    return gameWon;
}

function CheckResultFromHorizontal() {
    if (AllEqual([board[0], board[1], board[2], board[3]])) {
        console.log("You Win by Horizontal!");
        isWin = true;
    } else if (AllEqual([board[4], board[5], board[6], board[7]])) {
        console.log("You Win by Horizontal!");
        isWin = true;
    } else if (AllEqual([board[8], board[9], board[10], board[11]])) {
        console.log("You Win by Horizontal!");
        isWin = true;
    } else if (AllEqual([board[12], board[13], board[14], board[15]])) {
        console.log("You Win by Horizontal!");
        isWin = true;
    }
}

function CheckResultFromVertical() {
    if (AllEqual([board[0], board[4], board[8], board[12]])) {
        console.log("You Win by Vertical!");
        isWin = true;
    } else if (AllEqual([board[1], board[5], board[9], board[13]])) {
        console.log("You Win by Vertical!");
        isWin = true;
    } else if (AllEqual([board[2], board[6], board[10], board[14]])) {
        console.log("You Win by Vertical!");
        isWin = true;
    } else if (AllEqual([board[3], board[7], board[11], board[15]])) {
        console.log("You Win by Vertical!");
        isWin = true;
    }
}

function CheckResultFromDiaganal() {
    if (AllEqual([board[0], board[5], board[10], board[15]])) {
        console.log("You Win by Diaganal!");
        isWin = true;
    } else if (AllEqual([board[3], board[6], board[9], board[12]])) {
        console.log("You Win by Diaganal!");
        isWin = true;
    }
}

function CheckDrawResult() {
    // let check_if_exits = board.includes();
    // if (AllEqual(board) == false && check_if_exits == false) {
    //     if (win == false) {
    //         console.log("Draw!");
    //         win = false;
    //     }
    // }

    if (EmptySquare().length === 0) {
        console.log("Draw!");
        isWin = false;
        return true;
    }
    return false;
}

function AllEqual(arry) {
    const result = arry.every(element => {
        if (element === arry[0] && element !== "") {
            return true;
        }
    });

    return result;
}

function EmptySquare() {
    return board.filter((elm, i) => i === elm);
}

function CanReplaceField(oldEle, newEle) {
    if (oldEle.lastChild.id == "dendro" && newEle.lastChild.id == "pyro") {
        return true;
    } else if (oldEle.lastChild.id == "animo" && newEle.lastChild.id == "dendro") {
        return true;
    } else if (oldEle.lastChild.id == "hydro" && newEle.lastChild.id == "animo") {
        return true;
    } else if (oldEle.lastChild.id == "pyro" && newEle.lastChild.id == "hydro") {
        return true;
    }
}

function RandomCardSymbol(arry) {
    return arry[Math.floor(Math.random() * arry.length)];
}

function DrawCardAndEndPhase() {
    for (let hand of cards) {
        if (hand.innerHTML == "") {
            hand.innerHTML = RandomCardSymbol(deck);
        }
    }
}

function turn() {
    if (turn_count % 2 != 0) {
        player_turn = huPlayer;
    } else if (turn_count % 2 == 0) {
        player_turn = aiPlayer;
    }
    console.log(`This turn is : ${player_turn}`);
    // turn_count += 1;
    console.log(`Turn : ${turn_count}`);    
}

function DeclareWinner() {
    return player_turn;
}

function BestSpot() {
    return Minimax(board, aiPlayer).index;
}

function Minimax(new_board, player) {
    var avail_spots = EmptySquare(new_board);

    if (CheckWin(new_board, huPlayer)) {
        return { score: -10 };
    } else if (CheckWin(new_board, aiPlayer)) {
        return { score: 10 };
    } else if (avail_spots.length === 0) {
        return { score: 0 };
    }

    var moves = [];
    for (let i = 0; i < avail_spots.length; i++) {
        var move = {};
        move.index = new_board[avail_spots[i]];
        new_board[avail_spots[i]] = player;

        if (player = aiPlayer) {
            move.score = Minimax(new_board, huPlayer).score;
        } else {
            move.score = Minimax(new_board, aiPlayer).score;
        }

        new_board[avail_spots[i]] = move.index;
        if ((player === aiPlayer && move.score === 10) || (player === huPlayer && move.score === -10)) {
            return move;
        } else {
            moves.push(move);
        }
    }

    let bestMove, bestScore;
    if (player === aiPlayer) {
        bestScore = -1000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        bestScore = 1000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}