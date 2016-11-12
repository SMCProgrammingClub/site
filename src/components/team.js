import React, { Component } from 'react';
import _ from 'lodash';
import '../css/team.css';
import placeholder from '../img/placeholder.png';


const Officer = ({ name, title, pic }) => (
  <div className='officer'>
    <img className='pic' src={ pic || placeholder } alt={ name || 'Placeholder' } />
    <h3 className='name'>{ name || 'Place Holder' }</h3>
    <p className='title'>{ title || 'Holder of Places' }</p>
  </div>
);

export default class Team extends Component {
  render() {
    let officers = []; // Test array
    _.times(6, i => officers.push(<Officer key={i} />));

    return (
      <div className='team'>{ officers }</div>
    );
  }
}
