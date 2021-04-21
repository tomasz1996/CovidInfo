import Navbar from './components/Navbar.js'
import Home from './pages/Home.js'
import Map from './pages/Map.js'
import Ranking from './pages/Stats.js'
import Info from './pages/Info.js'
import './styles.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


function App() {
  return (
    <Router>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/map'>
            <Map />
          </Route>
          <Route exact path='/stats'>
            <Ranking />
          </Route>
          <Route exact path='/info'>
            <Info />
          </Route>
        </Switch>
   </Router>
  );
}


export default App;
