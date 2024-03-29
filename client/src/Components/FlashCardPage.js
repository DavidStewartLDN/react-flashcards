import React, { useState, useEffect, useContext} from 'react';
import './FlashCardPage.css';
import '../index.css';
import './DrawButton/DrawButton.css';
import Card from './Card/Card.js';
import DrawButton from './DrawButton/DrawButton.js';


import { Link } from "react-router-dom";
import { LanguageContext } from '../LanguageContext';

const FlashCardPage = () => {

    // get context
    const {language, setLanguage} = useContext(LanguageContext)

    // new database
    const [cards, setCards] = useState([]);
    const [currentCard, setCurrentCard] = useState({});

    useEffect(() => {
      getCards();
      setCurrentCard({english: "Press Draw Card!"})
    }, [language]);
    
    function getCards() {
      fetch(`/${language}`)
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
        <div className='cardRow'>
        <Card
          english={currentCard.english}
          native={currentCard.native}
          latin_script={currentCard.latin_script}
          />
        </div>
        <div className='buttonRow'>
          <DrawButton drawCard={updateCard}/>
        </div>
        <div className="buttonRow">
          <div className="buttonContainer">
            <Link to="/test" className="btn">
              <button className="btn">Test</button>
            </Link>
            <Link to="/add" className="btn">
              <button className="btn">Add Word</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlashCardPage;