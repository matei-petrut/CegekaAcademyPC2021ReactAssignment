import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Main from './components/Main/Main';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Main />
    </BrowserRouter>
  );
}

export default App;
