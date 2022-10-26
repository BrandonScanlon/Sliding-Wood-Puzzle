import React from 'react';
import './App.css';
import { layout } from './Layout.js';

import Model from './model/Model.js';
import { redrawCanvas } from './boundary/Boundary.js'

import { puzzleInformation } from './model/Puzzle.js'; 
import { selectPiece, movePiece} from './controller/Controller.js';

import { Up, Down, Left, Right } from './model/Model.js';

var actualPuzzle = JSON.parse(JSON.stringify(puzzleInformation));   // parses string into JSON object, used below.

function App() {
  // initial instantiation of the Model
  const [model, setModel] = React.useState(new Model(actualPuzzle));

  const appRef = React.useRef(null);      // Later need to be able to refer to App 
  const canvasRef = React.useRef(null);   // Later need to be able to refer to Canvas

  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect (() => {
    
    /** Happens once. */
    redrawCanvas(model, canvasRef.current, appRef.current);
  }, [model])   // this second argument is CRITICAL, since it declares when to refresh (whenever Model changes)

  const handleClick = (e) => {
    // console.log(e.screenX, e.screenY, e.clientX, e.clientY)
    // ^^^^^ useful for logging specific events for testing purposes
    let newModel = selectPiece(model, canvasRef.current, e);
    setModel(newModel);   // react to changes, if model has changed.
  }

  const movePieceHandler = (direction) => {
    let newModel = movePiece(model, direction);
    setModel(newModel);   // react to changes, if model has changed.
  }

  return (
    <main style={layout.Appmain} ref={appRef}>
      <canvas tabIndex="1"  
        data-testid="canvas"
        className="App-canvas"
        ref={canvasRef}
        width={layout.canvas.width}
        height={layout.canvas.height}
        onClick={handleClick} 
        />

        {/* Using '?' construct is proper React way to make image visible only when victorious. */}  
        { model.isVictorious() ? (<label data-testid="victory-label" style={layout.victory}>You've Won!"</label>) : null }

        <label data-testid="moves-label" style={layout.text}>{"Number of Moves: " + model.numMoves}</label>
        <div style={layout.buttons}>
           <button data-testid="upbutton" style={layout.upbutton}     onClick={(e) => movePieceHandler(Up)} disabled={!model.available(Up)}       >^</button>
           <button data-testid="leftbutton" style={layout.leftbutton}   onClick={(e) => movePieceHandler(Left)} disabled={!model.available(Left)}   >&lt;</button>
           <button data-testid="rightbutton" style={layout.rightbutton}  onClick={(e) => movePieceHandler(Right)} disabled={!model.available(Right)} >&gt;</button>
           <button data-testid="downbutton" style={layout.downbutton}   onClick={(e) => movePieceHandler(Down)} disabled={!model.available(Down)}  >v</button>
        </div>
    </main>
  );
}

export default App;
