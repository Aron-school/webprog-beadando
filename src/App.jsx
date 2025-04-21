import './App.css';
import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <div>
        <nav>
          <Link to="/minesweeper">
            <button className='minesweeper-button' type='button'>Mine Sweeper</button>
          </Link>
          <Link to="/memorygame">
            <button className='memory-button' type='button'>Memomory Game</button>
          </Link>
        </nav>
        <Outlet />
      </div>
    </>
  );
}

export default App;
