import React, { useState, useEffect} from 'react';
import './FlashCardPage.css';
import './TestPage.css';
import '../index.css';
import DrawButton from './DrawButton/DrawButton.js';
import firebase from 'firebase/app';
import 'firebase/database';
import { DB_CONFIG } from '../Config/Firebase/db_config';

import AnswerForm from './AnswerForm';

if (!firebase.apps.length) {
  firebase.initializeApp(DB_CONFIG);
}

const TestPage = () => {

  // select language from URL
  let language = 'russian'

  // new database
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState({});

  useEffect(() => {
    getCards();
  }, []);
  
  function getCards() {
    fetch(`http://localhost:3001/${language}`)
      .then(response => {
        return response.text();
      })
      .then(data => {
        setCards(JSON.parse(data));
      })
      .catch(error => {
        console.log(error);
      });
  }

  const getRandomCard = (cards) => {
      var card = cards[Math.floor(Math.random() * cards.length)];
      return card
  }

  const updateCard = () => {
    setCurrentCard(getRandomCard(cards));
  }

  return (
    <div>
      <div className="app">
        <div className='buttonRow'>
          <DrawButton drawCard={updateCard}/>
        </div>
        <div className="form">
          <AnswerForm english={currentCard.english} native={currentCard.native}/>
        </div>
      </div>
      
    </div>
  );
}

export default TestPage;