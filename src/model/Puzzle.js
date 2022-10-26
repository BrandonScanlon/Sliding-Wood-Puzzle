const puzzleConfig = {
//--------------------------------
"name": "WoodPuzzle 4x5",
"board" : {
    "rows"          : "5",
    "cols"          : "4",
    "target"        : "8",
    "destination"   : {
        "row" : "3",
        "col" : "1"
    },
    "exit" : {
        "start" : "1",
        "end"   : "2"
    },
    "finalMove" : "Down"
},
//--------------------------------
"pieces" : [
{
    "label" : "A",
    "isWinner"  : "false",
    "width"     : "1",
    "height"    : "2"
},
{
    "label" : "B",
    "isWinner"  : "true",
    "width"     : "2",
    "height"    : "2"
},
{
    "label" : "C",
    "isWinner"  : "false",
    "width"     : "1",
    "height"    : "2"
},
{
    "label" : "D",
    "isWinner"  : "false",
    "width"     : "1",
    "height"    : "2"
},
{
    "label" : "E",
    "isWinner"  : "false",
    "width"     : "1",
    "height"    : "1"
},
{
    "label" : "F",
    "isWinner"  : "false",
    "width"     : "1",
    "height"    : "1"
},
{
    "label" : "G",
    "isWinner"  : "false",
    "width"     : "1",
    "height"    : "2"
},
{
    "label" : "H",
    "isWinner"  : "false",
    "width"     : "1",
    "height"    : "1"
},
{
    "label" : "I",
    "isWinner"  : "false",
    "width"     : "1",
    "height"    : "1"
},
{
    "label" : "J",
    "isWinner"  : "false",
    "width"     : "2",
    "height"    : "1"
},
],
//--------------------------------
"locations" : [
{
    "piece" : "A",
    "location" : {
        "row"   : "0",
        "col"   : "0"
    }
},
{
    "piece" : "B",
    "location" : {
        "row"   : "0",
        "col"   : "1"
    }
},
{
    "piece" : "C",
    "location" : {
        "row"   : "0",
        "col"   : "3"
    }
},
{
    "piece" : "D",
    "location" : {
        "row"   : "2",
        "col"   : "0"
    }
},
{
    "piece" : "E",
    "location" : {
        "row"   : "2",
        "col"   : "1"
    }
},
{
    "piece" : "F",
    "location" : {
        "row"   : "2",
        "col"   : "2"
    }
},
{
    "piece" : "G",
    "location" : {
        "row"   : "2",
        "col"   : "2"
    }
},
{
    "piece" : "H",
    "location" : {
        "row"   : "3",
        "col"   : "1"
    }
},
{
    "piece" : "I",
    "location" : {
        "row"   : "3",
        "col"   : "2"
    }
},
{
    "piece" : "J",
    "location" : {
        "row"   : "4",
        "col"   : "1"
    }
},
]
};

export { puzzleConfig };
// 6x6 extra here