import React from "react";
import { connect } from "react-redux";

import { Move } from "../types/move";
import { XMove } from "./XMove";
import { OMove } from "./OMove";
import { BlankMove } from "./BlankMove";
import { State } from "../reducers/playerReducer";
import { addMove } from "../actions/addMove";
import { startOver } from "../actions/startOver";
import { RootState } from "../reducers/rootReducer";
import { Player } from "../types/player";

export interface BoardProps {}

export interface BoardState {}

const mapStateToProps = (state: RootState) => ({
  ...(state.player as State),
});

const mapDispatchToProps = { addMove, startOver };

type Props = BoardProps &
  ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const playerMoveMap = {
  [Player.X]: Move.X,
  [Player.O]: Move.O
}

class Board extends React.Component<Props, BoardState> {
  addMove = (row: number, position: number, move: Move) => {
    !this.props.won && this.props.addMove(row, position, move);
  };

  renderMove = (rowIndex: number, position: number, move: Move) => {
    if (move === Move.X) {
      return <XMove key={position} position={position}/>;
    }
    if (move === Move.O) {
      return <OMove key={position} position={position}/>;
    }
    return (
      <BlankMove
        key={position}
        addMove={() => this.addMove(rowIndex, position, playerMoveMap[this.props.turn])}
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
          <p className="startAgain" onClick={this.props.startOver}>
            Click to start again!
          </p>
        ) : (
          false
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
