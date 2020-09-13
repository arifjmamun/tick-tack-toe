import React, { Component } from "react";
import { connect } from "react-redux";

import { State } from "../reducers/player-reducer";

const mapStateToProps = (state: State) => state;

type Props =  ReturnType<typeof mapStateToProps>;

class Result extends Component<Props> {
  render() {
    const { turn, won, draw } = this.props;
    let result = "";
    if (turn) {
      result = `It's ${turn.toUpperCase()}'s turn.`;
    }
    if (won) {
      result = `Yay! ${won.toUpperCase()} won!`;
    } else if (draw) {
      result = "We have a draw!";
    }
    return (
      <div>
        <p>{result}</p>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Result);