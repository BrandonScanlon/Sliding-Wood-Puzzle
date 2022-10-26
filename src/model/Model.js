export class MoveType { 
    constructor(dr, dc) {
        this.deltaR = dr;
        this.deltaC = dc;
    }

    static parse(s) {
        if((s === "down")   || (s === "Down"))  { return Down; }
        if((s === "up")     || (s === "Up"))    { return Up; }
        if((s === "left")   || (s === "Left"))  { return Left; }
        if((s === "right")  || (s === "Right")) { return Right; }

        return NoMove;
    }
}

export const Down   = new MoveType(1, 0,   "down");
export const Up     = new MoveType(-1, 0,  "up");
export const Left   = new MoveType(0, -1,  "left");
export const Right  = new MoveType(0, 1,   "right");
export const NoMove = new MoveType(0, 0,   "*"); // no move is possible

export class Coordinate { 
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
}

export class Piece {
    constructor(w, h, isWinner) {
        this.width = w;
        this.height = h;
        this.isWinner = isWinner;
        this.row = 0;
        this.col = 0;
    }
}

export class Puzzle {
    constructor(numRows, numCols, destination, finalMove, exit) {
        this.numRows = numRows;
        this.numCols = numCols;
        this.destination = destination;
        this.finalMove = finalMove;
        this.selected = null;
    }
}

export default class Model {
    //info will be a JSON-encoded puzzle
    constructor(info) {
        this.initialize(info);
    }

    initialize(info) {
        let numRows = parseInt(info.board.rows);
        let numCols = parseInt(info.board.cols);
        let destination = new Coordinate(parseInt(info.board.destination.row), parseInt(info.board.destination.col));
        let finalMove = MoveType.parse(info.board.finalMove);

        this.puzzle = new Puzzle(numRows, numCols, destination, finalMove);
        this.numMoves = 0;
        this.victory = false;
    }
}