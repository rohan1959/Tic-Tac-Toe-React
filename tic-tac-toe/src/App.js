import './App.css';
import Board from './components/board/board';
function App() {
  return (<div>
    <h1> Tic Tac Toe</h1>
    <div className='box'>
      <Board></Board>
    </div>
  </div>)
}

export default App;
