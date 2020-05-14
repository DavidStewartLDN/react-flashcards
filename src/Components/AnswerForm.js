import React, { Component } from 'react';
import '../index.css';

class AnswerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.correct = 'green';

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.props.english === this.state.value){
      this.correct = 'green';
    }else{
      this.correct = 'red';
      console.log(this.correct)
    }
    this.forceUpdate( )
  }
  
  render() {
    return (
      <div className={
        (this.correct === 'green') ? 'green' : 'red'
      }>
        <div>
          <div className="thing">{this.props.native}</div>
        </div>
        <form  
        onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AnswerForm;