import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import configuredStore from "../reducers/configure-store";
import { ActionLog } from "../models/action-log.model";
import {
  ActionType,
  AddedActionLogAction,
  AddActionLogAction,
} from "./actionType";
import { ActionLogService } from "../services/action-log.service";
import { AddActionLog } from "../models/add-action-log.model";

export const addActionLogActionCreator: ActionCreator<ThunkAction<
  Promise<AddedActionLogAction>,
  ActionLog,
  null,
  AddedActionLogAction
>> = (log: AddActionLog) => {
  return async (dispatch: Dispatch) => {
    const actionLogService = new ActionLogService();
    const addActionLogAction: AddActionLogAction = {
      type: ActionType.ADD_ACTION_LOG,
    };

    dispatch(addActionLogAction);
    
    const state = configuredStore.store.getState();
    log.isGameDraw = state.draw;
    log.isGameOver = !!state.won || state.draw;

    const actionLog = await actionLogService.addActionLog(log);
    const addedActionLogAction: AddedActionLogAction = {
      actionLog,
      type: ActionType.ADDED_ACTION_LOG,
    };
    return dispatch(addedActionLogAction);
  };
};
