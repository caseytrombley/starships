import logo from './logo.svg';
import Starships from './components/starships';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="header">
          <img
              src={logo}
              className="logo"
              alt="logo"
              onClick={refreshPage}
          />
      </header>
        <div className="main">
            <Starships />
        </div>
    </div>
  );
}

function refreshPage() {
    window.location.reload(false);
}

export default App;
