import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import { ActionLog } from "../models/action-log.model";
import {
  ActionType,
  AddedActionLogAction,
  AddActionLogAction,
} from "./actionType";
import { ActionLogService } from "../services/action-log.service";

export const addActionLogActionCreator: ActionCreator<ThunkAction<
  Promise<AddedActionLogAction>,
  ActionLog,
  null,
  AddedActionLogAction
>> = (log: any) => {
  return async (dispatch: Dispatch) => {
    const actionLogService = new ActionLogService();
    const addActionLogAction: AddActionLogAction = {
      type: ActionType.ADD_ACTION_LOG,
    };
    dispatch(addActionLogAction);
    const actionLog = await actionLogService.addActionLog(log);
    const addedActionLogAction: AddedActionLogAction = {
      actionLog,
      type: ActionType.ADDED_ACTION_LOG,
    };
    return dispatch(addedActionLogAction);
  };
};
