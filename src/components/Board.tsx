import React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { Move } from "../types/move";
import { Player } from "../types/player";
import { XMove } from "./XMove";
import { OMove } from "./OMove";
import { BlankMove } from "./BlankMove";
import { State } from "../reducers/player-reducer";
import { addMove, AddMove } from "../actions/addMove";
import { startOver, StartOver } from "../actions/startOver";
import { AddedActionLogAction } from "../actions/actionType";
import { AddActionLog } from "../models/add-action-log.model";
import { addActionLogActionCreator } from "../actions/add-action-log";

export interface BoardState {}

export interface BoardProps {
  addMove: (row: number, position: number, move: Move) => AddMove;
  startOver: () => StartOver;
  addActionLog: (log: AddActionLog) => Promise<AddedActionLogAction>;
}

const mapStateToProps = (state: State) => state;

const mapThunkDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AnyAction>
) => {
  return {
    addMove: (row: number, position: number, move: Move) =>
      dispatch(addMove(row, position, move)),
    startOver: () => dispatch(startOver()),
    addActionLog: (log: AddActionLog) =>
      dispatch(addActionLogActionCreator(log)),
  };
};

type Props = BoardProps &
  ReturnType<typeof mapStateToProps> &
  typeof mapThunkDispatchToProps;

const playerMoveMap = {
  [Player.X]: Move.X,
  [Player.O]: Move.O,
};

class Board extends React.Component<Props, BoardState> {
  addMove = async (row: number, position: number, move: Move) => {
    const moveNo = row * 3 + position + 1;
    if (!this.props.won) {
      this.props.addMove(row, position, move);
    }
    if (this.props.won || this.props.draw) {
      return;
    }
    const log: AddActionLog = {
      sessionId: this.props.sessionId,
      moveNo,
      player: this.props.turn,
      row
    };

    await this.props.addActionLog(log);
  };

  renderMove = (rowIndex: number, position: number, move: Move) => {
    if (move === Move.X) {
      return <XMove key={position} position={position} />;
    }
    if (move === Move.O) {
      return <OMove key={position} position={position} />;
    }
    return (
      <BlankMove
        key={position}
        addMove={async () =>
          await this.addMove(rowIndex, position, playerMoveMap[this.props.turn])
        }
      />
    );
  };

  render() {
    const wonClass = this.props.won ? ` won-${this.props.wonLine}` : "";
    const drawClass = this.props.draw ? " draw" : "";
    const boardClass = "board" + wonClass + drawClass;
    return (
      <div className={boardClass}>
        {Object.keys(this.props.board).map((rowIndex) => {
          return (
            <div className={`row row${rowIndex}`} key={rowIndex}>
              {this.props.board[rowIndex].map((move, positon) => {
                return this.renderMove(parseInt(rowIndex), positon, move);
              })}
            </div>
          );
        })}
        {this.props.won || this.props.draw ? (
          <button
            type="button"
            className="startAgain"
            onClick={this.props.startOver}
          >
            Click to start again!
          </button>
        ) : (
          false
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapThunkDispatchToProps)(Board);
