import React, { Component } from 'react';
import './index.css';

import 'react-toolbox/lib/commons.scss';


import TitleBar from './components/TitleBar.js';
import Main from './components/Main.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TitleBar />
        <Main />
      </div>
    );
  }
}

export default App;
