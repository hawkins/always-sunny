import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TitleBar from "./components/TitleBar";
import Main from "./components/Main";

import "./index.css";
import "react-toolbox/lib/commons.scss";

const Child = ({ match: { params: { season, episode } } }) => (
  <Main season={season} episode={episode} />
);

export default () => (
  <Router>
    <div className="App">
      <TitleBar />
      <Route exact path="/" component={Child} />
      <Route exact path="/:season" component={Child} />
      <Route exact path="/:season/:episode" component={Child} />
    </div>
  </Router>
);
