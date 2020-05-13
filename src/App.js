import React, { Component} from 'react';
import './index.css';

import FlashCardPage from './FlashCardPage';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <div>
      <FlashCardPage/>
    </div>
  );
}

export default App;
