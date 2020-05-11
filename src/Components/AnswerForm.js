import React, { Component, State} from 'react';
import '../index.css';

class AnswerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.english = props.english
    this.native = props.native

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div>
          <div className="thing">Card Text goes here</div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AnswerForm;