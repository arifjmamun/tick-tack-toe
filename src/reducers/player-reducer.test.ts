import { playerReducer, State, initialState } from "./player-reducer";
import { Move } from "../types/move";
import { Player } from "../types/player";
import { ActionType } from "../actions/actionType";

it("Should add a move at given position and change turn", () => {
  const state: State = {
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
  const nextState = playerReducer(state, {
    type: ActionType.ADD_MOVE,
    playerMove: Move.O,
    row: 0,
    position: 0,
  });
  expect(nextState.board[0]).toEqual([Move.O, Move.Blank, Move.Blank]);
  expect(nextState.turn).toEqual(Player.X);
});

it('Should set "won" move when a winning line is set', () => {
  const state: State = {
    board: {
      0: [Move.X, Move.O, Move.Blank],
      1: [Move.Blank, Move.X, Move.Blank],
      2: [Move.O, Move.Blank, Move.Blank],
    },
    won: undefined,
    wonLine: undefined,
    draw: false,
    turn: Player.X,
  };
  const nextState = playerReducer(state, {
    type: ActionType.ADD_MOVE,
    playerMove: Move.X,
    row: 2,
    position: 2,
  });
  expect(nextState.won).toEqual(Player.X);
});

it("Should reset the state to initial", () => {
  const state: State = {
    board: {
      0: [Move.X, Move.O, Move.Blank],
      1: [Move.Blank, Move.X, Move.Blank],
      2: [Move.O, Move.Blank, Move.Blank],
    },
    won: undefined,
    wonLine: undefined,
    draw: false,
    turn: Player.X,
  };
  const nextState = playerReducer(state, { type: ActionType.START_OVER });
  expect(nextState).toEqual(initialState);
});
