import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import { ActionLog } from "./../models/action-log.model";
import {
  LoadedActionLogsAction,
  LoadingActionLogsAction,
  ActionType,
} from "./actionType";
import { ActionLogService } from "../services/action-log.service";

export const getActionLogsActionCreator: ActionCreator<ThunkAction<
  Promise<LoadedActionLogsAction>,
  ActionLog[],
  null,
  LoadedActionLogsAction
>> = (sessionId: string) => {
  return async (dispatch: Dispatch) => {
    const actionLogService = new ActionLogService();
    const loadingActionLogsAction: LoadingActionLogsAction = {
      type: ActionType.LOADING_ACTION_LOGS,
    };
    dispatch(loadingActionLogsAction);
    const actionLogs = await actionLogService.getAllActionLogs(sessionId);
    const loadedActionLogsAction: LoadedActionLogsAction = {
      actionLogs,
      type: ActionType.LOADED_ACTION_LOGS,
    };
    return dispatch(loadedActionLogsAction);
  };
};
