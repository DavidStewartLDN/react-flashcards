import React, { useState, useEffect, useContext} from 'react';
import './FlashCardPage.css';
import './TestPage.css';
import '../index.css';
import DrawButton from './DrawButton/DrawButton.js';

import AnswerForm from './AnswerForm';
import { LanguageContext } from '../LanguageContext';

import { Link } from "react-router-dom";

const TestPage = () => {

  const {languageTest, setLanguageTest} = useContext(LanguageContext)

  // select language from URL
  let language = languageTest

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
        <p style={{color: "red"}}>{languageTest}</p>
        <button onClick={() => setLanguageTest('russian')}>change language</button>
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