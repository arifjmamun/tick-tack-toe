import React, { useEffect } from "react";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { State } from "../reducers/player-reducer";
import { getActionLogsActionCreator } from "../actions/get-action-logs";
import { LoadedActionLogsAction } from "../actions/actionType";
import { connect } from "react-redux";
import { ActionLog } from "../models/action-log.model";

interface Props {
  getActionLogs: (sessionId: string) => Promise<LoadedActionLogsAction>;
  sessionId: string;
  actionLogs: ActionLog[];
}

export const ActionLogs: React.FC<Props> = ({
  getActionLogs,
  sessionId,
  actionLogs,
}) => {
  useEffect(() => {
    getActionLogs(sessionId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ul className="logs">
      <h3>Action Logs</h3>
      {actionLogs &&
        actionLogs.map((log, index) => {
          return (
            <li key={log.id}>
              <b>Move {actionLogs.length - index}: </b>{log.logMessage}
            </li>
          );
        })}
    </ul>
  );
};

const mapStateToProps = (state: State) => {
  return {
    actionLogs: state.actionLogs,
    sessionId: state.sessionId,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getActionLogs: (sessionId: string) =>
      dispatch(getActionLogsActionCreator(sessionId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionLogs);
