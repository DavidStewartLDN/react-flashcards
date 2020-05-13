import React, { Component} from 'react';
import './index.css';

import FlashCardPage from './FlashCardPage';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
      <Router>
        <Switch>
          <Route path='/' component={FlashCardPage} />
        </Switch>
      </Router>
  );
}

export default App;
