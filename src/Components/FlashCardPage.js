import React, { useState, useEffect} from 'react';
import './FlashCardPage.css';
import '../index.css';
import './DrawButton/DrawButton.css';
import Card from './Card/Card.js';
import DrawButton from './DrawButton/DrawButton.js';

import firebase from 'firebase/app';
import 'firebase/database';
import { DB_CONFIG } from '../Config/Firebase/db_config';


import { Link } from "react-router-dom";

if (!firebase.apps.length) {
  firebase.initializeApp(DB_CONFIG);
}

const FlashCardPage = () => {

    // select language from URL
    let language = ""
    if (window.location.href.split('/')[3]) {
      language = window.location.href.split('/')[3]
    } else {
      language = 'italian'
    }

    // Bring in database from props
    const app = firebase
    const database = app.database().ref().child(language);

    // let updateCard = this.updateCard.bind(this);
    const [cards, setCards] = useState([])
    const [currentCard, setCurrentCard] = useState({})

    // new database
    const [words, setWords] = useState(false);
    const [currentWords, setCurrentWords] = useState([]);
    const newArray = []

    useEffect(() => {
      let currentCards = []
      database.on('child_added', snap => {
        currentCards.push({
          id: snap.key,
          english: snap.val().english,
          native: snap.val().native,
          latin_script: snap.val().latin_script
        })
        setCards(currentCards);
        setCurrentCard(getRandomCard(currentCards));
      })
    }, []);

    useEffect(() => {
      getWords();
    }, []);
    
    function getWords() {
      fetch('http://localhost:3001')
        .then(response => {
          return response.text();
        })
        .then(data => {
          setWords(JSON.parse(data));
        });
    }

  const currentLanguageCards = () => {
    var arrayLength = words.length;
    for (var i = 0; i < arrayLength; i++) {
      if(words[i]["language"]===language){
        currentWords.push(words[i]);
        console.log(words[i]);
      }
    }
  }

  const getRandomCard = (cards) => {
    var card = cards[Math.floor(Math.random() * cards.length)];
    return card
  }

  const updateCard = () => {
    setCurrentCard(getRandomCard(cards));
  }

  // console.log(cards)
  // console.log(cards[0])

  // console.log(typeof(words))
  console.log(words)
  console.log(`Current words are: ${currentWords}`)
  // console.log(words[0])

  return (
    <div>
      <div className="app">
        <div className='cardRow'>
        <Card
          test={console.log(currentCard)}
          english={currentCard.english}
          native={currentCard.native}
          latin_script={currentCard.latin_script}
          />
          <Card
          test={console.log(currentCard)}
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
            <button onClick={currentLanguageCards}>Run Current language cards</button>
          </div>
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