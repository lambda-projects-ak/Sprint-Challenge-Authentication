import React, { Component } from 'react';
import './App.css';

import Login from './components/Login';
import Jokes from './components/Jokes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Dad Jokes</h1>
        <Login />
        <Jokes />
      </div>
    );
  }
}

export default App;
