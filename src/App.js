import React from 'react';
import './App.css';
import 'bulma/css/bulma.css'
import './spacing.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
import Home from "./pages/Home";
import CreateService from "./pages/CreateService";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import ServiceContainer from "./containers/ServiceContainer";
import CreateTest from "./pages/CreateTest";
import Test from "./pages/Tests";

function App() {
  return (
    <div className="App container">
      <div className="section u-p-b-10 u-p-t-10">
        <nav className="navbar">
          <div className="navbar-brand">
            <a className="navbar-item u-p-0" href="/">
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
      </div>
      <hr className="u-m-t-0 u-m-b-0"/>
      <Router>
        <Switch>
            <Route path="/services/new" exact children={ <CreateService /> } />
            <Route path="/services/:service_id" strict exact children={ <ServiceContainer /> }/>
            <Route path="/services/:service_id/tests/new" strict exact children={ <CreateTest /> }/>
            <Route path="/tests/:test_id" strict exact children={ <Test /> }/>
            <Route path="/" exact children={ <Home/> } />
        </Switch>
      </Router>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>API Monitor</strong> by <a href="https://realsangil.github.io">Sangil Park</a>. The source code is
            licensed <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
            <div className="u-m-t-10">
              <a href="https://github.com/realsangil/apimonitor">
                <FontAwesomeIcon className="is-large" icon={faGithub} />
              </a>
            </div>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
