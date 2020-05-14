import React, { Component, useState, useEffect} from 'react';
import './FlashCardPage.css';
import '../index.css';
import './DrawButton/DrawButton.css';
import Card from './Card/Card.js';
import DrawButton from './DrawButton/DrawButton.js';

import firebase from 'firebase/app';
import 'firebase/database';
import { DB_CONFIG } from '../Config/Firebase/db_config';

import { ReactComponent as BellIcon } from '../icons/bell.svg';
import { ReactComponent as MessengerIcon } from '../icons/messenger.svg';
import { ReactComponent as CaretIcon } from '../icons/caret.svg';
import { ReactComponent as PlusIcon } from '../icons/plus.svg';
import { Link } from "react-router-dom";

import DropdownMenu from './DropdownMenu.js';
import NavItem from './NavItem.js';
import Navbar from './Navbar.js';

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

    useEffect(() => {
      database.on('child_added', snap => {
        setCards(cards.push({
          id: snap.key,
          english: snap.val().english,
          native: snap.val().native,
          latin_script: snap.val().latin_script
        }))
        setCurrentCard(getRandomCard(cards))
      })
      console.log(cards);
      console.log(currentCard);
    }, []);

  const getRandomCard = (cards) => {
    var card = cards[Math.floor(Math.random() * cards.length)]
    console.log(card)
    return card

  }

  const updateCard = () => {
    setCurrentCard(getRandomCard(cards));
    console.log(currentCard);
  }

  return (
    <div>
      <Navbar>
        <NavItem icon={<PlusIcon />} />
        <NavItem icon={<BellIcon />} />
        <NavItem icon={<MessengerIcon />} />

        <NavItem icon={<CaretIcon />}>
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </Navbar>
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
        <div className="buttonContainer">
        <Link to="/test" className="btn">Test</Link>
        </div>
      </div>
      
    </div>
  );
}

export default FlashCardPage;
