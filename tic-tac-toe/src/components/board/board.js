import Square from "../square/square";
import React from 'react';
import './board.css';
import { checkWinner } from '../../utilities/checkWinner';

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      steps: 0,
      squares: Array(9).fill(null),
      xAndOToggle: true,
      canUndo: false,
      history: [
        {
          squares: Array(9).fill(null),
        },
      ]
    };
  }

  getTurn() {
    return this.state.xAndOToggle ? "X" : "O";
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.steps + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (checkWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.getTurn();
    this.setState({
      squares: squares,
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      canUndo: true,
      steps: history.length,
      xAndOToggle: !this.state.xAndOToggle,
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

  resetGame = () => {
    this.setState({
      squares: Array(9).fill(null),
      xAndOToggle: true,
      steps: 0,
      canUndo: false
    });
  }

  undoGame = () => {
    let previousSquare = this.state.history[this.state.steps - 1];
    let previousHistory = this.state.history;
    previousHistory[this.state.steps] = null;
    let steps = this.state.steps - 1;
    this.setState({
      squares: previousSquare.squares,
      steps: steps,
      xAndOToggle: !this.state.xAndOToggle,
      history: previousHistory,
      canUndo: steps >= 1
    })
  }

  render() {
    const winner = checkWinner(this.state.squares);
    let gameSummary;
    if (winner) {
      gameSummary = 'Winner: ' + winner;
    }
    else if (this.state.steps === 9 && !winner) {
      gameSummary = 'Game Drawn';
    }
    let currentPlayer = `Player to make move is ${this.state.xAndOToggle ? 'X' : 'O'}`;
    return (
      <div className="container-vertical">
        <div id="status" className="status">{currentPlayer} </div>
        <div className="center">
          {this.renderBoard()}
        </div>
        <div className="game-options" >
          <button id="reset" onClick={this.resetGame} disabled={this.state.steps < 1} className="btn btn-reset">Reset</button>
          <button id="undo" onClick={this.undoGame} disabled={!this.state.canUndo} className="btn btn-undo">Undo</button>
        </div>
        <div id="summary" className="status center"> {gameSummary} </div>
      </div>
    );
  }

}

export default Board;