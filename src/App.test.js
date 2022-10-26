import React from 'react';
import { render, screen } from '@testing-library/react';
import Model from './model/Model.js';
import App from './App.js';

// default puzzle to use
import { puzzleConfig } from './model/Puzzle.js';


var actualPuzzle = JSON.parse(JSON.stringify(puzzleConfig)); // parses string into JSON object

var model = new Model(actualPuzzle);


test('No moved when model created', () => {
  expect(model.numMoves).toBe(0)
});

test('Properly renders 0 moves', () => {
  const { getByText } = render(<App />);
  const movesElement = getByText(/Number of Moves: 0/i);
  expect(movesElement).toBeInTheDocument();
});
