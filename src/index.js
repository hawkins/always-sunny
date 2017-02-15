import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import offlinePluginRuntime from 'offline-plugin/runtime';
offlinePluginRuntime.install();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
