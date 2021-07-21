import logo from './logo.svg';
import Starships from './components/starships';
import audio from './starwars.mp3';
import './App.css';

function App() {
    return (
        <div className="app">
            <header className="header">
                <img
                  src={logo}
                  className="logo"
                  alt="logo"
                  onClick={starWars}
                />
            </header>
            <div className="main">
                <Starships />
            </div>
        </div>
    );
}

function starWars() {
    // window.location.reload(false);
    new Audio(audio).play();
}


export default App;
