import { Reducer } from "redux";
import { v4 as uuidv4 } from "uuid";
import * as _ from "lodash";

import { Player } from "../types/player";
import { Board } from "../types/board";
import { ActionLog } from "./../models/action-log.model";
import {
  PlayerAction,
  ActionType,
  AddedActionLogAction,
  LoadedActionLogsAction,
} from "../actions/actionType";
import { AddMove } from "../actions/addMove";
import { getPlayerResult } from "../utils/helper";
import { Move } from "../types/move";

export interface State {
  sessionId: string;
  loading: boolean;
  actionLogs: ActionLog[];
  board: Board;
  won: Player | undefined;
  wonLine: string | undefined;
  draw: boolean;
  turn: Player;
}

export const initialState: State = {
  sessionId: uuidv4(),
  loading: false,
  board: {
    0: [Move.Blank, Move.Blank, Move.Blank],
    1: [Move.Blank, Move.Blank, Move.Blank],
    2: [Move.Blank, Move.Blank, Move.Blank],
  },
  won: undefined,
  wonLine: undefined,
  draw: false,
  turn: Player.O,
  actionLogs: [],
};

export const playerReducer: Reducer<State, PlayerAction> = (
  state: State = initialState,
  action: PlayerAction
): State => {
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
    case ActionType.ADD_ACTION_LOG:
      return { ...state, loading: true };
    case ActionType.ADDED_ACTION_LOG:
      const { actionLog } = action as AddedActionLogAction;
      const logs = [actionLog].concat(state.actionLogs);
      return { ...state, loading: false, actionLogs: logs};
    case ActionType.LOADING_ACTION_LOGS:
        return { ...state, loading: true };
    case ActionType.LOADED_ACTION_LOGS:
        const { actionLogs } = action as LoadedActionLogsAction;
        return { ...state, loading: false, actionLogs };
    case ActionType.START_OVER:
      return { ...initialState, sessionId: uuidv4() };
    default:
      return state;
  }
};

export default playerReducer;
