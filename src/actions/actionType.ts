import { Action } from "redux";

import { AddMove } from "./addMove";
import { StartOver } from "./startOver";
import { ActionLog } from "../models/action-log.model";

export enum ActionType {
  ADD_MOVE = "ADD_MOVE",
  START_OVER = "START_OVER",
  LOADING_ACTION_LOGS = 'LOADING_ACTION_LOGS',
  LOADED_ACTION_LOGS = 'LOADED_ACTION_LOGS',
  ADD_ACTION_LOG = 'ADD_ACTION_LOG',
  ADDED_ACTION_LOG = 'ADDED_ACTION_LOG',
}

export interface LoadingActionLogsAction extends Action<ActionType.LOADING_ACTION_LOGS> {}

export interface LoadedActionLogsAction extends Action<ActionType.LOADED_ACTION_LOGS> {
  actionLogs: ActionLog[];
}

export interface AddActionLogAction extends Action<ActionType.ADD_ACTION_LOG> {
  type: ActionType.ADD_ACTION_LOG;
}

export interface AddedActionLogAction extends Action<ActionType.ADDED_ACTION_LOG> {
  actionLog: ActionLog;
}

export type PlayerAction =
  | AddMove
  | StartOver
  | LoadingActionLogsAction
  | LoadedActionLogsAction
  | AddActionLogAction
  | AddedActionLogAction;
