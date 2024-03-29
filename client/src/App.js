import React, { useState, useEffect } from 'react';
import './index.css';

import FlashCardPage from './Components/FlashCardPage';
import TestPage from './Components/TestPage';
import AddWordPage from './Components/AddWordPage';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ReactComponent as CaretIcon } from './icons/caret.svg';

import DropdownMenu from './Components/DropdownMenu.js';
import NavItem from './Components/NavItem.js';
import Navbar from './Components/Navbar.js';
import { LanguageContext } from './LanguageContext';
import CurrentLanguageDisplay from './Components/CurrentLanguageDisplay';



function App() {

  useEffect(() => {
    document.title = "Flashcards"
  }, []);

  const [language, setLanguage] = useState('italian');

  return (
    <div>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <Navbar>
          <NavItem icon={<CaretIcon />}>
            <DropdownMenu></DropdownMenu>
          </NavItem>
        </Navbar>
          <div className="app">
            <CurrentLanguageDisplay/>
          </div>
        <Router>
          <div>
            <Switch>
              <Route exact path="/">
                <FlashCardPage />
              </Route>
              <Route path="/test">
                <TestPage />
              </Route>
              <Route path="/add">
                <AddWordPage />
              </Route>
            </Switch>
          </div>
        </Router>
      </LanguageContext.Provider>
    </div>
  );
}

export default App;
