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
    
    move(direction) {
        this.row += direction.deltaR;
        this.col += direction.deltaC;
    }
    
    location() {
        return new Coordinate(this.row, this.col);
    }
    
    *coordinated() {
        for(let r = 0; r < this.height; r++) {
            for(let c = 0; c < this.width; c++) {
                yield new Coordinate(this.row + r, this.col + c);
            }
        }
    }
    
    contains(coord) {
        let cs = [...this.coordinates()]; //javascript one liner... turn all of those yield into a list
        for(let c of cs) {
            if(c.row === coord.row && c.col === coord.col) {
                return true;
            }  
        }
        return false;
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
    
    select(piece) {
        this.selected = piece;
    }
    
    isSelected(piece) {
        return piece === this.selected;
    }
    
    isCovered(coord) {
        let index = this.pieces.findIndex(piece => piece.contains(coord));
        
        // if we found a piece that covers coordinate, return true; otherwise false
        return index >= 0;
    }  
    
    availableMoves() {
        let p = this.selected;
        if(p == null) { return []; }
        
        let moves = [];
        let coord = this.selected.location();
        
        // can we move left?
        let available = false;
        if(coord.col > 0) {
            available = true;
            for(let r = 0; r < p.height; r++) {
                if(this.isCovered(new Coordinate(coord.row + r, coord.col - 1))) {
                    available = false;
                    break;
                }
            }
        }
        if(available) {
            moves.push(Left);
        }
        
        //can we move right?
        if(coord.col + p.width < this.numCols) {
            available = true;
            for(let r = 0; r < p.height; r++) {
                if(this.isCovered(new Coordinate(coord.row+r, coord.col + p.width))) {
                    available = false;
                    break;
                }
            }
        }
        if(available) {
            moves.push(Right);
        }
        
        //can we move down?
        if(coord.row + p.height < this.numRows) {
            available = true;
            for(let c = 0; c < p.width; c++) {
                if(this.isCovered(new Coordinate(coord.row + p.height, coord.col + c))) {
                    available = false;
                    break;
                }
            }
        }
        if(available) {
            moves.push(Down);
        }
        
        //can we move up?
        if(coord.col + p.width < this.numCols) {
            available = true;
            for(let r = 0; r < p.height; r++) {
                if(this.isCovered(new Coordinate(coord.row+r, coord.col + p.width))) {
                    available = false;
                    break;
                }
            }
        }
        if(available) {
            moves.push(Right);
        }
        return moves;
    }
}

export default class Model {
    //info will be a JSON-encoded puzzle
    constructor(info) {
        this.initialize(info);
        this.info = info;
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
    
    updateMoveCount(delta) {
        this.numMoves += delta;
    }
    
    numberOfMoves() {
        return this.numMoves;
    }
    
    available(direction) {
        // if no piece selected? Then none are available
        if(!this.puzzle.selected) { return false; }
        if(direction === NoMove) { return false; }
        
        let allMoves = this.puzzle.availableMoves();
        return allMoves.includes(direction);
    }
    
    copy() {
        let m = new Model(this.info);
        m.puzzle = this.puzzle.clone();
        m.numMoves = this.numMoves;
        m.showLabels = this.showLabels;
        m.victory = this.victory;
        return m;
    }
}