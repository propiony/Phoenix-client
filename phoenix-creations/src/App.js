
import './App.css';
import LandingPage from "./pages/LandingPage"
import {
  BrowserRouter as Router,
  //Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>

      <Route exact path="/"><LandingPage/></Route>

      </Router>


    </div>
  );
}

export default App;
