import React from 'react';
import './DrawButton.css';

const DrawButton = (props) => {
  const drawCard = () => {
    props.drawCard();
  }

  return(
    <div className="buttonContainer">
      <button className="btn" onClick={drawCard}>Draw Card</button>
    </div>
  )
}

export default DrawButton