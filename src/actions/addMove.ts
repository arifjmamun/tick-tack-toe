import { ActionType } from "./actionType";
import { Move } from "../types/move";

export interface AddMove {
  type: ActionType;
  playerMove: Move;
  row: number;
  position: number;
}

export const addMove = (row: number, position: number, move: Move): AddMove => ({
  type: ActionType.ADD_MOVE,
  playerMove: move,
  row,
  position,
});
