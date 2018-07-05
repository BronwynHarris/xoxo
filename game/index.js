import { Map } from "immutable";
//let board = Map();
//board = board.setIn([1, 1], "X");
//ACTION
export const MOVE = "MOVE";
//ACTION CREATER
export const move = (player, coord) => ({
  type: MOVE,
  player, coord
});
function turnReducer(currentTurn = "X", action) {
  if (action.type === MOVE) return currentTurn === "X" ? "O" : "X";
  return currentTurn;
}
function board(board = Map(), { type, coord, player }) {
  if (type === MOVE) return board.setIn(coord, player);
  return board;
}

function bad({turn,board},{type,player,coord}){
  if(board.hasIn(coord)){
    return `${coord} is already taken!`
  }
}

function winner(board){

  for(let i=0; i <3; i++){
    const col = streak(board, [i,0], [i,1], [i,2])
    if(col) return col
    const row = streak(board, [0,i], [1,i], [2,i])
    if(row) return row
  }
  
  const diagDown = streak(board, [0,0], [1,1], [2,2])
  if(diagDown) return diagDown
  
  const diagUp = streak(board, [0,2], [1,1], [2,0])
  if(diagUp) return diagUp

  for(let i=0; i <3; i++){
    for(let j=0; j<3; j++){
      if(!board.hasIn([i,j])) return null
    }
  }

  return 'draw'
}

function streak(board, firstCoord, ...remainingCoords){
  const player = board.getIn(firstCoord)
  if(!player) return null
  for(let coord of remainingCoords){
    if(board.getIn(coord)!==player) return null
  }
  return player
}

export default function reducer(state = {}, action) {
  const nextBoard = board(state.board, action);
  return {
    winner: winner(nextBoard),
    turn: turnReducer(state.turn, action),
    board: nextBoard
  };
}



