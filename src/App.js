import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    // List with all sketches.
    this.sketchList = {
      gravity: {
        name: 'Gravitron',
        sketch: 'gravity',
      }, 
      gravity2: {
        name: 'Other Sketch',
        sketch: 'gravity2',
      },
    };
    const urlParam = window.location.hash.substr(1);
    // If the url parameter is invalid resort to the default sketch.
    const queriedSketch = this.sketchList[urlParam] ? this.sketchList[urlParam] : this.sketchList['gravity'];
    this.state = { currentSketch: queriedSketch }
    this.changeSketch = this.changeSketch.bind(this);
  }

  // Pressing the buttons changes the sketch for testing. We should implement some sort of carousel later.
  changeSketch(sketch) {
    if (window.location.hash.substr(1) !== sketch) {
      window.location.hash = sketch;
      const queriedSketch = this.sketchList[sketch] ? this.sketchList[sketch] : this.sketchList['gravity'];
      this.setState({ currentSketch: queriedSketch })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="title">SMC Programming Club</div>
        <div className="info">"{this.state.currentSketch.name}"</div>
        <button
          onClick={() => this.changeSketch('gravity')}
          style={{ position: 'fixed', right: '2%', top: '2%' }}
        >
          Change to Gravity
        </button>
        <button
          onClick={() => this.changeSketch('gravity2')}
          style={{ position: 'fixed', right: '2%', top: '10%' }}
        >
          Change to Gravity2
        </button>
        <div id="sketch-container">
          <iframe id="sketch" src={`sketches/${this.state.currentSketch.sketch}`} scrolling="no"></iframe>
        </div>
      </div>
    );
  }
}

export default App;
