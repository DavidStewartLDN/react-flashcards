import React, { Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './Card/Card';
import DrawButton from './DrawButton/DrawButton';

class App extends Component {

  constructor(props){
    super(props);

    this.updateCard = this.updateCard.bind(this);

    this.state = {
      cards: [
        {id: 1, eng: "English", han: "Hanzi", pin: "Pinyin"},
        {id: 2, eng: "English_2", han: "Hanzi_2", pin: "Pinyin_2"},
      ],
      currentCard: {}
    }
  }

  componentWillMount(){
    const currentCards = this.state.cards;

    this.setState({
      cards: currentCards,
      currentCard: this.getRandomCard(currentCards)
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
