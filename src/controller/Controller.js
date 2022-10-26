import { computeRectangle } from "../boundary/Boundary";

export function selectPiece(model, canvas, event) {
 const canvasRect = canvas.getBoundingClientRect();

 // find piece on which mouse was clicked
 let index = model.puzzle.pieces.findIndex(piece => {
    let rect = computeRectangle(piece);
    return rect.contains(event.clientX - canvasRect.left, event.clientY - canvasRect.top);
 });

 let selected = null;
 if(index >= 0) {
    selected = model.puzzle.pieces[index];
 } else {
    return model;
 }

 //select this piece! Construct new model to represent this situation
 model.puzzle.select(selected);
 return model.copy();

}

export function movePiece(model, direction) {
    let selected = model.puzzle.selected;
    if(!selected) { return selected; }

    selected.move(direction);
    model.updateMoveCount(+1);
    return model.copy;
}