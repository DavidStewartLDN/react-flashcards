import React, { Component } from 'react';
import './FlashCardPage.css';
import './TestPage.css';
import '../index.css';
import Card from './Card/Card.js';
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

class TestPage extends Component {

  constructor(props){
    super(props);

    // select language from URL
    let language = 'russian'

    // Bring in database from props
    this.app = firebase
    this.database = this.app.database().ref().child(language);

    this.updateCard = this.updateCard.bind(this);

    this.state = {
      cards: [],
      currentCard: {}
    }
  }

  componentWillMount(){
    const currentCards = this.state.cards;

    this.database.on('child_added', snap => {
      currentCards.push({
        id: snap.key,
        english: snap.val().english,
        native: snap.val().native,
        latin_script: snap.val().latin_script
      })
      this.setState({
        cards: currentCards,
        currentCard: this.getRandomCard(currentCards)
      })
    })
  }

  getRandomCard(currentCards){
    var card = currentCards[Math.floor(Math.random() * currentCards.length)]
    return card
  }

  updateCard(){
    const currentCards = this.state.cards;
    this.setState({
      currentCard: this.getRandomCard(currentCards)
    })
  }

  render() {
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
          <DrawButton drawCard={this.updateCard}/>
        </div>
        <div className="form">
          <AnswerForm english={this.state.currentCard.english} native={this.state.currentCard.native}/>
        </div>
      </div>
      
    </div>
  );
  }
}

export default TestPage;