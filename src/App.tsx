import './App.css';
import React from 'react';
import Container from '@material-ui/core/Container';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import ActivateServices from './components/ActivateServices';
import WatchTogether from './components/WatchTogether';
import { TwitchRedirectUrl } from './components/TwitchRedirectUrl';

const App = () => {
  return (
      <div className="App">
        <Router>
          <Header />
          <Container>
            <Switch>
              <Route exact path="/">
                <Redirect to="home" />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/activate-service">
                <ActivateServices />
              </Route>
              <Route path="/twitch-redirect-url">
                <TwitchRedirectUrl />
              </Route>
              <Route exact path="/watch-together/:sessionId">
                <WatchTogether />
              </Route>
            </Switch>
          </Container>
        </Router>
      </div>
  )
}

export default App;
