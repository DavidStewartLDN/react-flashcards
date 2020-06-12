import React, { useState, useEffect, useContext} from 'react';
import './FlashCardPage.css';
import '../index.css';


import { Link } from "react-router-dom";
import { LanguageContext } from '../LanguageContext';

const AddWordPage = () => {

    // get context
    const {language, setLanguage} = useContext(LanguageContext)

    // input information
    const [english, setEnglish] = useState('')
    const [native, setNative] = useState('')
    const [latinScript, setLatinScript] = useState('')

    const handleChangeEnglish = (event) => {
      setEnglish(event.target.value);
    }
    const handleChangeNative = (event) => {
      setNative(event.target.value);
    }
    const handleChangeLatinScript = (event) => {
      setLatinScript(event.target.value);
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      let latin_script = latinScript;
      fetch(`http://localhost:3001/${language}/word`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({english, native, latin_script})
      })
      .then(response => {
        return response.text();
      })
      .catch(error => {
        console.log(error);
      });
    }

  return (
    <div>
      <div className="app">
      <form onSubmit={handleSubmit} style={{color: 'white'}}>
        <div> English: 
          <input type="text" value={english} onChange={handleChangeEnglish} />
        </div>
        <div> Native: 
          <input type="text" value={native} onChange={handleChangeNative} />
        </div>
        { language != 'italian' 
              ? <div> Latin Script: 
                <input type="text" value={latinScript} onChange={handleChangeLatinScript} />
              </div>
              : null
         }
        <div className="buttonRow">
          <div className="buttonContainer">
            <input className="btn" type="submit" value="Add Word" />
          </div>
        </div>
      </form>
        <div className="buttonRow">
          <div className="buttonContainer">
            <Link to="/" className="btn">
              <button to="/" className="btn">Flashcard</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddWordPage;