import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Home } from '../Home/Home';
import { About } from '../About/About';
import { Events } from '../Events/Events';
import { Login } from "../Login/login";
import './App.css';
import '../Banner/banner.css';

const App = () => (
  <Router>
    <div className="App">
      <div className="App-header">
        <h2>TOURNEYLOC</h2>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/user">User</Link></li>
          </ul>
        </nav>

      </div>
      <div className="App-body">
        <div className="Content">
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/events" component={Events} />
        <Route path="/user" component={Login} />
        </div>
        <div className="App-bg">
          <img className="first" alt="" src={require("../Banner/images/img1.jpg")}/>
          <img alt="" src={require("../Banner/images/img2.jpg")} />
          <img alt="" src={require("../Banner/images/img3.jpg")} />
          <img alt="" src={require("../Banner/images/img4.jpg")} />
          <img alt="" src={require("../Banner/images/img5.jpg")} />
          <img alt="" src={require("../Banner/images/img6.jpg")} />
          <img alt="" src={require("../Banner/images/img1.jpg")} />
          <img alt="" src={require("../Banner/images/img2.jpg")} />
          <img alt="" src={require("../Banner/images/img3.jpg")} />
          <img alt="" src={require("../Banner/images/img4.jpg")} />
        </div>
      </div>
    </div>
  </Router>
)

export default App
