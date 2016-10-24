import React, { Component } from 'react';
import p5 from 'p5';
import gravitron from './sketches/gravitron';
// Same sketch, but with blue planets for testing.
import otherSketch from './sketches/otherSketch';
import './App.css';

class App extends Component {
  constructor() {
    super();
    // List with all sketches.
    this.sketchList = {
      gravitron: {
        name: 'Gravitron',
        sketch: gravitron,
      }, 
      otherSketch: {
        name: 'Other Sketch',
        sketch: otherSketch,
      },
    };
    const urlParam = window.location.search.substr(1);
    // If the url parameter is invalid resort to the default sketch.
    const queriedSketch = this.sketchList[urlParam] ? this.sketchList[urlParam] : this.sketchList['gravitron'];
    this.state = { currentSketch: queriedSketch }
    this.changeSketch = this.changeSketch.bind(this);
  }

  // Pressing the buttons changes the sketch for testing. We should implement some sort of carousel later.
  changeSketch(sketch) {
    if (window.location.search.substr(1) !== sketch) {
      window.location.search = sketch;
      const queriedSketch = this.sketchList[sketch] ? this.sketchList[sketch] : gravitron;
      this.setState({ currentSketch: queriedSketch })
      new p5(this.state.currentSketch.sketch, 'sketch');
    }
  }

  render() {
    return (
      <div className="App">
        <div id="sketch"></div>
        <div className="title">SMC Programming Club</div>
        <div className="info">"{this.state.currentSketch.name}"</div>
        <button
          onClick={() => this.changeSketch('gravitron')}
          style={{ position: 'fixed', right: '2%', top: '2%' }}
        >
          Change to Gravitron
        </button>
        <button
          onClick={() => this.changeSketch('otherSketch')}
          style={{ position: 'fixed', right: '2%', top: '10%' }}
        >
          Change to Other Sketch
        </button>
      </div>
    );
  }

  componentDidMount() {
    new p5(this.state.currentSketch.sketch, 'sketch');
  }
}

export default App;
