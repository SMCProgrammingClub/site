import React, { Component } from 'react';
import '../css/tab-nav.css';

const Tab = ({ onClick, title, active }) => (
  <div className={ active ? 'tab active' : 'tab'}>
    <button className='tab-button' onClick={onClick}>{title}</button>
  </div>
);

export default class TabNav extends Component {
  render() {
    const tabs = this.props.tabs.map((t, i) => 
      <Tab
        key={i}
        title={t.title}
        onClick={() => this.props.onChange(i)}
        active={i === this.props.activeTab}
      />
    );
    const Comp = this.props.tabs[this.props.activeTab || 0].Component;
    return (
      <div className='tab-nav'>
        <div className='tab-nav-bar'>{tabs}</div>
        <div className='tab-container'><Comp /></div>
      </div>
    );
  }
}
