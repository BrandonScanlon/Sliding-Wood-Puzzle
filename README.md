## Sliding Wooden Puzzle App

# MoveType
--------
deltaR  : int //Row
deltaC  : int //Col


# Coordinate
----------
row : int
col : int


# Puzzle
------
pieces      : Piece [*]
numRows     : int
numCols     : int
selected    : Piece[0...1]
destination : Coordinate
finalMove   : MoveType


# Piece
------
width       : int
height      : int
row         : int
column      : int
isWinner    : boolean


# Model
------
puzzle      : Puzzle
numMoves    : int
victory     : boolean