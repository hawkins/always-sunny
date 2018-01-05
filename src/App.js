import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TitleBar from "./components/TitleBar";
import Main from "./components/Main";
import ThemeProvider from "react-toolbox";
import theme from "./toolbox/theme";
import "./index.css";

const Child = ({ match: { params: { season, episode } } }) => (
  <Main season={season} episode={episode} />
);

export default () => (
  <Router>
    <ThemeProvider theme={theme}>
      <div className="App">
        <TitleBar />
        <Route exact path="/" component={Child} />
        <Route exact path="/:season" component={Child} />
        <Route exact path="/:season/:episode" component={Child} />
      </div>
    </ThemeProvider>
  </Router>
);
