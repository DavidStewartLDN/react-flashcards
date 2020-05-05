import React, { Component} from 'react';
import './App.css';
import Card from './Card/Card';
import DrawButton from './DrawButton/DrawButton';
import firebase from 'firebase/app';
import 'firebase/database';

import { DB_CONFIG } from './Config/Firebase/db_config';

if (!firebase.apps.length) {
  firebase.initializeApp(DB_CONFIG);
}

class App extends Component {

  constructor(props){
    super(props);

    this.app = firebase
    this.database = firebase.database().ref().child('cards');

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
        eng: snap.val().eng,
        han: snap.val().han,
        pin: snap.val().pin
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
    <div className="App">
      <div className='cardRow'>
      <Card
        eng={this.state.currentCard.eng}
        han={this.state.currentCard.han}
        pin={this.state.currentCard.pin}
        />
      </div>
      <div className='buttonRow'>
        <DrawButton drawCard={this.updateCard}/>
      </div>
    </div>
  );
  }
}

export default App;
