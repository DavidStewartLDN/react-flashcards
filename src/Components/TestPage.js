import React, { useState, useEffect, useContext} from 'react';
import '../index.css';
import DrawButton from './DrawButton/DrawButton.js';
import './DrawButton/DrawButton.css';

import AnswerForm from './AnswerForm';
import { LanguageContext } from '../LanguageContext';

import { Link } from "react-router-dom";

const TestPage = () => {

  const {language, setLanguage} = useContext(LanguageContext)

  // new database
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState({});

  useEffect(() => {
    getCards();
    setCurrentCard({native: "Draw Card!"})
  }, [language]);
  
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
      console.log(card)
      return card
  }

  const updateCard = () => {
    setCurrentCard(getRandomCard(cards));
  }
  
  console.log('hey')

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
      <div className="buttonRow">
          <div className="buttonContainer">
            <Link to="/" className="btn">
              <button to="/" className="btn">Flashcard</button>
            </Link>
          </div>
        </div>
      
    </div>
  );
}

export default TestPage;