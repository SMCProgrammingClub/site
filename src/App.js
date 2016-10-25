import React, { Component } from 'react';
import './App.css';

const sketches = ['gravity', 'gravity2'];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sketch: 'gravity',
    };
  }

  cycleSketch() {
    const nextSketch = this.state.sketch === 'gravity' ? 'gravity2' : 'gravity';
    this.setState({
      sketch: nextSketch,
    });
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.cycleSketch.bind(this)}>Change sketch</button>
        <div id="sketch-container">
          <iframe id="sketch" src={`sketches/${this.state.sketch}`} scrolling="no"></iframe>
        </div>
      </div>
    );
  }
}

export default App;
