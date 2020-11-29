import Square from "../square/square";
import React from 'react';
import './board.css';

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  renderSquare(i) {
    return (
      <Square id={i} key={i} />
    );
  }

  renderBoard() {
    return (
      <div className="board">
        <div className="board-row">
          {this.renderRow(0, 2)}
        </div>
        <div className="board-row">
          {this.renderRow(3, 5)}
        </div>
        <div className="board-row">
          {this.renderRow(6, 8)}
        </div>
      </div>
    )
  }

  renderRow(start, end) {
    let row = []
    for (let i = start; i <= end; i++) {
      row.push(this.renderSquare(i));
    }
    return row;
  }

  render() {
    return (
      <div className="center">
        {this.renderBoard()}
      </div>
    );
  }

}

export default Board;