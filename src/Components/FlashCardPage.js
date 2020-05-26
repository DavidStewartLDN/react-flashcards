import React, { useState, useEffect, useContext} from 'react';
import './FlashCardPage.css';
import '../index.css';
import './DrawButton/DrawButton.css';
import Card from './Card/Card.js';
import DrawButton from './DrawButton/DrawButton.js';


import { Link } from "react-router-dom";
import { LanguageContext } from '../LanguageContext';

const FlashCardPage = (props) => {

  console.log(props.language.languageTest)

    // get context
    const {languageTest, setLanguageTest} = useContext(LanguageContext)

    // select language from URL
    // let language = ""
    // if (window.location.href.split('/')[3]) {
    //   language = window.location.href.split('/')[3]
    // } else {
    //   language = 'italian'
    // }

    // new database
    const [cards, setCards] = useState([]);
    const [currentCard, setCurrentCard] = useState({});

    useEffect(() => {
      getCards();
    }, [props.language.languageTest]);
    
    function getCards() {
      fetch(`http://localhost:3001/${languageTest}`)
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
        <p style={{color: "red"}}>{languageTest}</p>
        <button onClick={() => setLanguageTest('mandarin')}>change language</button>
        <div className='buttonRow'>
          <DrawButton drawCard={updateCard}/>
        </div>
        <div className="buttonRow">
          <div className="buttonContainer">
            <Link to="/test" className="btn">
              <button to="/test" className="btn">Test</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlashCardPage;