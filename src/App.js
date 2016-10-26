import React, { Component } from 'react';
import _ from 'lodash';
import Slider from 'react-slick';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import About    from './components/about';
import Projects from './components/projects';
import Team     from './components/team';
import Join     from './components/join';
import sketches from './sketches';
import './App.css';

class App extends Component {
  constructor() {
    super();
    const urlParam = window.location.hash.substr(1);
    let queriedSketch = _.find(sketches, (s) => s.path === urlParam);
    // If the url parameter is invalid resort to a random sketch.
    if (!queriedSketch) {
      const randomNumber = Math.floor(Math.random() * sketches.length);
      queriedSketch = sketches[randomNumber];
      window.location.hash = queriedSketch.path;
    }
    this.state = { currentSketch: queriedSketch }
  }

  afterSketchChange = (currentSlide) => {
    const nextSketch = sketches[currentSlide] || sketches[0];
    window.location.hash = nextSketch.path;
    this.setState({ currentSketch: nextSketch });
  }

  componentDidMount() {
    this.refs.slider.slickGoTo(sketches.indexOf(this.state.currentSketch));
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
          {
            /*
            <div className="content">
              <Slider>
                <About />
                <Projects />
                <Team />
                <Join />
              </Slider>
            </div>
            */
          }
          <div className="title">SMC Programming Club</div>
          <div key={this.state.currentSketch.title} className="info">"{this.state.currentSketch.title}"</div>
          <div key={this.state.currentSketch.path} id="sketch-container">
            <iframe
              id="sketch"
              src={`sketches/${this.state.currentSketch.path}/`}
              scrolling="no"
            >
            </iframe>
          </div>
          <div className="carousel-container">
            <Slider ref='slider' className="carousel" {...carouselSettings} afterChange={this.afterSketchChange}>
              {
                sketches.map((s) => <div key={s.path}><h3>{s.title}</h3></div>)
              }
            </Slider>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default App;
