import React from 'react';
import './Card.css';

const Card = (props) => (
  <div className="card-container">
    <div className= "card">
      <div className="front">
        <div className="english">{props.english}{console.log('Card has been run')}{console.log(props)}</div>
      </div>
      <div className="back">
        <div className="native">{props.native}</div>
        <div className="latin_script">{props.latin_script}</div>
      </div>
    </div>
  </div>
)

export default Card;