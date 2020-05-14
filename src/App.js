import React from 'react';
import './index.css';

import FlashCardPage from './Components/FlashCardPage';
import TestPage from './Components/TestPage';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
      <Router>
        <div>
          <Switch>
            <Route path="/test">
              <TestPage />
            </Route>
            <Route path="/">
              <FlashCardPage />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
