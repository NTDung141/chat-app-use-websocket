import './App.css';
import {
  BrowserRouter as Router
} from "react-router-dom";
import HeaderComponent from './components/header/HeaderComponent';
import Routes from './routes';

function App() {
  return (
    <div className="App">
      <Router>
        <HeaderComponent />

        <Routes />
      </Router>
    </div>
  );
}

export default App;
