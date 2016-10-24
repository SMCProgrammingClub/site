import React, { Component } from 'react';
import p5 from 'p5';
import logo from './logo.svg';
import { sketch } from './components/canvas';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div style={{width: 200, height: 200}} id="sketch"></div>
      </div>
    );
  }

  componentDidMount() {
    new p5(sketch, 'sketch');
  }
}

export default App;
