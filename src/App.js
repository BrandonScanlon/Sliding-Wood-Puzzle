import React from 'react';
import './App.css';
import { layout } from './Layout';
import Model from './model/Model';
import {puzzleConfig } from './model/Puzzle.js';
import {redrawCanvas } from './boundary/Boundary.js';
import { selectPiece, movePiece } from './controller/Controller';


var actualPuzzle = JSON.parse(JSON.stringify(puzzleConfig));
function App() {
// initial instantiation of the Model
  const [model, setModel] = React.useState(new Model(actualPuzzle));

  const appRef = React.useRef(null); // Later need to be able to refer to App
  const canvasRef = React.useRef(null); // Later need to be able to refer to Canvas

  /** Ensures initial rendering is performed, and that whenever the model changes, it is re-rendered. */
  React.useEffect (() => {
    /** Happens once. */
    redrawCanvas(model, canvasRef.current, appRef.current)
  }, [model]) // this second argument is CRITICAL, since it declared when to refresh

  const handleClick = (e) => {
    let newModel = selectPiece(model, canvasRef.current, e);
    setModel(newModel);
  }

  const movePieceHandler = (direction) => {
    let newModel = movePiece(model, direction);
    setModel(newModel); //react to changes, 
  }

  return (
    <main style={layout.Appmain} ref={appRef}>
      <canvas tabIndex="1"
      className="App-canvas"
      ref={canvasRef}
      width={layout.canvas.width}
      height={layout.canvas.height}
      onClick={handleClick}
      />
      <label style={layout.text}>{ "Number of Moves: " + model.numMoves } </label>
      <div style={layout.buttons}>
      <button style={layout.upButton}     onClick={(e) => movePieceHandler(Up)}     disabled={!model.available(Up)}>    ^</button>
      <button style={layout.leftButton}   onClick={(e) => movePieceHandler(Left)}   disabled={!model.available(Left)}>  &lt;</button>
      <button style={layout.rightButton}  onClick={(e) => movePieceHandler(Right)}  disabled={!model.available(Right)}> &gt;</button>
      <button style={layout.downButton}   onClick={(e) => movePieceHandler(Down)}     disabled={!model.available(Down)}>    V</button>
      </div>
    </main>
  );
}

export default App;
