# Sliding Wooden Puzzle App
------
## MoveType

deltaR  : int //Row <br />
deltaC  : int //Col <br />

------
## Coordinate

row : int <br />
col : int <br />

------
## Puzzle

pieces      : Piece [*] <br />
numRows     : int <br />
numCols     : int <br />
selected    : Piece[0...1] <br />
destination : Coordinate <br />
finalMove   : MoveType <br />

------
## Piece

width       : int <br />
height      : int <br />
row         : int <br />
column      : int <br />
isWinner    : boolean <br />

------
## Model

puzzle      : Puzzle <br />
numMoves    : int <br />
victory     : boolean <br />