import Square from "../square/square";
import React from 'react';
import './board.css';

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xAndOToggle: true,// True for X and False for O
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xAndOToggle ? 'X' : 'O';
    this.setState({
      squares: squares,
      xAndOToggle: !this.state.xAndOToggle
    });
  }

  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
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