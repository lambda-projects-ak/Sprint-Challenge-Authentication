import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import Login from './components/Login';
import Jokes from './components/Jokes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Dad Jokes</h1>
        <Route exact path="/" render={props => <Login {...props} />} />
        <Route path="/jokes" render={props => <Jokes {...props} />} />
      </div>
    );
  }
}

export default App;
