import React, { useState } from 'react';
import '../index.css';

const AnswerForm = (props) => {

  const [value, setValue] = useState('')
  const [correct, setCorrect] = useState('blue')

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(props.english === value){
      setCorrect('green');
    }else{
      setCorrect('red');
    }
  }
  
  return (
    <div className={correct}>
      <div>
        <div className="thing">{props.native}</div>
      </div>
      <form  
      onSubmit={handleSubmit}>
          <input type="text" value={value} onChange={handleChange} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default AnswerForm;