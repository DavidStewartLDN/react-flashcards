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

    // new database
    const [words, setWords] = useState([]);
    const [currentWord, setCurrentWord] = useState({});

    useEffect(() => {
      getWords();
    }, []);
    
    function getWords() {
      fetch('http://localhost:3001')
        .then(response => {
          console.log(response);
          return response.text();
        })
        .then(data => {
          console.log(data);
          console.log(JSON.parse(data));
          setWords(JSON.parse(data));
        })
        .catch(error => {
          console.log(error);
        });
    }

  const getRandomCard = (words) => {
    if(words.length === 0) {

    } else {
      var card = words[Math.floor(Math.random() * words.length)];
      console.log(words)
      console.log(card)
      return card
    }
  }

  const updateCard = () => {
    setCurrentWord(getRandomCard(words));
  }

 
  console.log(words)
  console.log(currentWord)


  return (
    <div>
      <div className="app">
        <div className='cardRow'>
        <Card
          english={currentWord.english}
          native={currentWord.native}
          latin_script={currentWord.latin_script}
          />
        </div>
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