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
import TabNav   from './components/tab-nav';
import sketches from './sketches';
import { parseHash, createHash } from './HashRoute';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const urlParams = parseHash(window.location.hash);
    let queriedSketch = _.find(sketches, (s) => s.path === urlParams.sketch);
    // If the url parameter is invalid, resort to a random sketch.
    if (!queriedSketch) {
      const randomNumber = Math.floor(Math.random() * sketches.length);
      queriedSketch = sketches[randomNumber];
    }
    this.state = { tab: urlParams.tab, sketch: queriedSketch };
  }

  afterSketchChange = (currentSlide) => {
    const nextSketch = sketches[currentSlide] || sketches[0];
    window.location.hash = createHash({ sketch: nextSketch.path }, window.location.hash);
    this.setState({ sketch: nextSketch });
  }

  onChangeTab = (index) => {
    this.setState({ tab: index });
  }

  componentDidMount() {
    this.refs.slider.slickGoTo(sketches.indexOf(this.state.sketch));
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
    const tabs = [
      { title: 'About', Component: About },
      { title: 'Projects', Component: Projects },
      { title: 'Team', Component: Team },
      { title: 'Join', Component: Join },
    ];
    return (
      <div className="App">

        <div className="content">
          <div className="title">SMC Programming Club</div>
          <TabNav onChange={this.onChangeTab} activeTab={this.state.tab || 0} tabs={tabs} />
        </div>

        <div className="sketches-carousel">
          <Slider ref="slider" {...carouselSettings} afterChange={this.afterSketchChange}>
            {
              sketches.map((s) => <div key={s.path}><h3>{s.title}</h3></div>)
            }
          </Slider>
        </div>
          
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          <div key={this.state.sketch.path} id="sketch-container">
            <iframe
              id="sketch"
              src={`sketches/${this.state.sketch.path}/`}
              scrolling="no"
            >
            </iframe>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default App;
