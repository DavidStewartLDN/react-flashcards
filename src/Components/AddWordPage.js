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

  return (
    <div>
      <div className="app">
        <div className='buttonRow'>
        </div>
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