import React, { useState, useEffect} from 'react';
import './FlashCardPage.css';
import './TestPage.css';
import '../index.css';
import DrawButton from './DrawButton/DrawButton.js';
import firebase from 'firebase/app';
import 'firebase/database';
import { DB_CONFIG } from '../Config/Firebase/db_config';

import { ReactComponent as BellIcon } from '../icons/bell.svg';
import { ReactComponent as MessengerIcon } from '../icons/messenger.svg';
import { ReactComponent as CaretIcon } from '../icons/caret.svg';
import { ReactComponent as PlusIcon } from '../icons/plus.svg';

import DropdownMenu from './DropdownMenu.js';
import NavItem from './NavItem.js';
import Navbar from './Navbar.js';
import AnswerForm from './AnswerForm';

if (!firebase.apps.length) {
  firebase.initializeApp(DB_CONFIG);
}

const TestPage = () => {

  // select language from URL
  let language = 'russian'

  // Bring in database from props
  const app = firebase
  const database = app.database().ref().child(language);

  // let updateCard = this.updateCard.bind(this);
  const [cards, setCards] = useState([])
  const [currentCard, setCurrentCard] = useState({})

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

const getRandomCard = (cards) => {
  var card = cards[Math.floor(Math.random() * cards.length)];
  return card
}

const updateCard = () => {
  setCurrentCard(getRandomCard(cards));
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