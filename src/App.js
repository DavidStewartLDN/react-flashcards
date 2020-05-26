import React, { useState } from 'react';
import './index.css';

import FlashCardPage from './Components/FlashCardPage';
import TestPage from './Components/TestPage';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';

import DropdownMenu from './Components/DropdownMenu.js';
import NavItem from './Components/NavItem.js';
import Navbar from './Components/Navbar.js';
import { LanguageContext } from './LanguageContext';


function App() {
  const [languageTest, setLanguageTest] = useState('italian');

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
      <Router>
      <LanguageContext.Provider value={{ languageTest, setLanguageTest }}>
        <div>
          <Switch>
            <Route path="/test">
              <TestPage />
            </Route>
            <Route path="/">
            <LanguageContext.Consumer>
                {languageTest => (
                  <FlashCardPage language={languageTest}/>
                )}
              </LanguageContext.Consumer>
            </Route>
          </Switch>
        </div>
      </LanguageContext.Provider>
      </Router>
      </div>
  );
}

export default App;
