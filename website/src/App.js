import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ThemeProvider from "react-toolbox/lib/ThemeProvider";
import TitleBar from "./components/TitleBar";
import Main from "./components/Main";
import theme from "./assets/react-toolbox/theme";
import "./assets/react-toolbox/theme.css";
import "./assets/normalize.css";
import "./index.css";

const Child = ({
  match: {
    params: { season, episode }
  }
}) => <Main season={season} episode={episode} />;

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <TitleBar />
            <Route exact path="/" component={Child} />
            <Route exact path="/:season" component={Child} />
            <Route exact path="/:season/:episode" component={Child} />
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
