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
    constructor(w, h, isWinner, label) {
        this.width = w;
        this.height = h;
        this.isWinner = isWinner;
        this.label = label;
        this.row = 0;
        this.col = 0;
    }

    place(row, col) {
        this.row = row;
        this.col = col;
    }

    location() {
        return new Coordinate(this.row, this.col);
    }

    copy() {
        let p = new Piece(this.width, this.height, this.isWinner, this.label);
        p.place(this.row, this.col);
        return p;
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
 
    initialize(pieces) {
        // make sure to create NEW Piece objects
        this.pieces = pieces.map(p => p.copy());
    }

    // return all blocks
    *blocks() {
        for(let i = 0; i < this.pieces.length; i++) {
            yield this.pieces[i];
        }
    }

    clone() {
        let copy = new Puzzle(this.numRows, this.numCols, this.destination, this.finalMove);
        copy.pieces = [];
        for(let p of this.pieces) {
            let dup = p.copy();
            copy.pieces.push(dup);
 
            if(p === this.selected) {
                copy.selected = dup;
            }
        }
        return copy;
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

        var allPieces = [];
        for(let p of info.pieces) {
            allPieces.push(new Piece(parseInt(p.width), parseInt(p.height), (p.isWinner === "true"), p.label));
        }

        for(let loc of info.locations) {
            let coord = new Coordinate(parseInt(loc.location.row), parseInt(loc.location.col));

            let index = allPieces.findIndex(piece => (piece.label === loc.piece));
            allPieces[index].place(coord.row, coord.col);
        }

        this.puzzle = new Puzzle(numRows, numCols, destination, finalMove);
        this.puzzle.initialize(allPieces);
        this.numMoves = 0;
        this.victory = false;
        this.showLabels = false;
    }

    copy() {
        let m = new Model();
        m.puzzle = this.puzzle.clone();
        m.numMoves = this.numMoves;
        m.showLabels = this.showLabels;
        m.victory = this.victory;
        return m;
    }
}