import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' 
import Slider from 'react-slick';
import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick-theme.css';
import './App.css';

class App extends Component {
  constructor() {
    super();
    // List with all sketches.
    this.sketchList = {
      gravity: {
        title: 'To every action there is always opposed an equal reaction.',
        sketch: 'gravity',
        index: 0,
      }, 
      gravity2: {
        title: 'If I have seen further than others, it is by standing upon the shoulders of giants.',
        sketch: 'gravity2',
        index: 1,
      },
    };
    this.sketchNames = ['gravity', 'gravity2'];

    const urlParam = window.location.hash.substr(1);
    let queriedSketch;
    // If the url parameter is invalid resort to a random sketch.
    if (this.sketchList[urlParam]) {
      queriedSketch = this.sketchList[urlParam];
    } else {
      const randomNumber = Math.floor(Math.random() * this.sketchNames.length);
      const sketchName = this.sketchNames[randomNumber];
      queriedSketch = this.sketchList[sketchName];
      window.location.hash = sketchName;
    }
    this.state = { currentSketch: queriedSketch }
    this.afterChange = this.afterChange.bind(this);
  }

  afterChange(currentSlide) {
    const sketchName = this.sketchNames[currentSlide];
    window.location.hash = sketchName;
    const queriedSketch = this.sketchList[sketchName] ? this.sketchList[sketchName] : this.sketchList['gravity'];
    this.setState({ currentSketch: queriedSketch })
  }

  componentDidMount() {
    this.refs.slider.slickGoTo(this.state.currentSketch.index);
  }

  render() {
    const carouselSettings = {
      arrows: true,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className="App">
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          <div className="title">SMC Programming Club</div>
          <div key={this.state.currentSketch.title} className="info">"{this.state.currentSketch.title}"</div>
          <div key={this.state.currentSketch.sketch} id="sketch-container">
            <iframe id="sketch" src={`sketches/${this.state.currentSketch.sketch}`} scrolling="no"></iframe>
          </div>
          <div className="carousel-container">
            <Slider ref='slider' className="carousel" {...carouselSettings} afterChange={this.afterChange}>
              <div><h3>Gravity</h3></div>
              <div><h3>Other Gravity</h3></div>
            </Slider>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default App;
