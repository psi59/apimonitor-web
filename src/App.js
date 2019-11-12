import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.css'
import './spacing.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Service from "./pages/Service";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
import NewService from "./pages/NewService";

function App() {
  return (
    <div className="App container">
      <nav className="navbar is-spaced">
        <div className="navbar-brand">
          <a className="navbar-item" href="#">
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt={''}/>
          </a>
        </div>
        <div className="navbar-end">
          <div className="dropdown">
            <div className="dropdown-trigger">
              <button className="button is-primary">
                <span>Services</span>
                <span className="icon is-small">
                  <FontAwesomeIcon icon={faCaretDown} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <Router>
        <Switch>
          <Route path="/service/new">
            <NewService />
          </Route>
          <Route path="/">
            <Service/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
