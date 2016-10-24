import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div id="sketch-container">
          <iframe id="sketch" src="sketches/gravity2" scrolling="no"></iframe>
        </div>
      </div>
    );
  }
}

export default App;
