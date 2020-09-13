import { Reducer } from "redux";
import * as _ from "lodash";

import { Player } from "../types/player";
import { Board } from "../types/board";
import { Action, ActionType } from "../actions/actionType";
import { AddMove } from "../actions/addMove";
import { getPlayerResult } from "../utils/helper";
import { Move } from "../types/move";

export interface State {
  board: Board;
  won: Player | undefined;
  wonLine: string | undefined;
  draw: boolean;
  turn: Player;
}

export const initialState: State = {
  board: {
    0: [Move.Blank, Move.Blank, Move.Blank],
    1: [Move.Blank, Move.Blank, Move.Blank],
    2: [Move.Blank, Move.Blank, Move.Blank],
  },
  won: undefined,
  wonLine: undefined,
  draw: false,
  turn: Player.O,
};

export const playerReducer: Reducer<State, Action> = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.ADD_MOVE:
      const { row, position, playerMove } = action as AddMove;
      const newState = _.cloneDeep(state);
      newState.board[row][position] = playerMove;

      const playerX = getPlayerResult(Player.X, newState.board);
      const playerO = getPlayerResult(Player.O, newState.board);

      if (playerX.won) {
        newState.won = Player.X;
        newState.wonLine = playerX.line;
      }
      if (playerO.won) {
        newState.won = Player.O;
        newState.wonLine = playerO.line;
      }
      if (!newState.won) {
        newState.turn = newState.turn === Player.O ? Player.X : Player.O;
      }

      const playedAllMoves = Object.keys(newState.board)
        .reduce((moves, key) => {
          moves.push(...newState.board[key]);
          return moves;
        }, [] as string[])
        .every((move) => move !== Move.Blank);

      if (playedAllMoves && !newState.won) {
        newState.draw = true;
      }
      return newState;
    case ActionType.START_OVER:
      return initialState;
    default:
      return state;
  }
};

export default playerReducer;
