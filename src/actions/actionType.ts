import { AddMove } from "./addMove";
import { StartOver } from "./startOver";

export enum ActionType {
  ADD_MOVE = "ADD_MOVE",
  START_OVER = "START_OVER",
}
 export type Action = AddMove | StartOver;