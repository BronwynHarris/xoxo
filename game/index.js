import { Map } from "immutable";
//let board = Map();
//board = board.setIn([1, 1], "X");
//ACTION
export const MOVE = "MOVE";
//ACTION CREATER
export const move = (player, coord) => {
  type: MOVE;
  player, coord;
};
function turnReducer(currentTurn = "X", action) {
  if (action.type === MOVE) return currentTurn === "X" ? "O" : "X";
  return currentTurn;
}
function board(board = Map(), { type, coord, player }) {
  if (type === MOVE) return board.setIn(coord, player);
  return board;
}

export default function reducer(state = {}, action) {
  const nextBoard = board(state.board, action);
  return {
    turn: turnReducer(state.turn, action),
    board: nextBoard
  };
}
export default function reducer(state = {}, action) {
  // TODO
  const newState=Object.assign({},state);
  switch (action.type) {
    case MOVE:
       newState.board=newState.board.setIn(action.position,action.player);
    default:
      return state;
  }
}



