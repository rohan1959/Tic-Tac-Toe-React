import './App.css';
import Board from './components/board/board';
function App() {
  return (
    <div>
      <h2 className="header">Lets Play Tic Tac Toe !</h2>
      <div className="container">
        <div className='box'>
          <Board></Board>
        </div>
      </div>
    </div>
  )
}

export default App;
