import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Main from './components/Main/Main';
import { AlbumsContextProvider } from './contexts/AlbumsContext';

function App() {
  return (
    <BrowserRouter>
    <AlbumsContextProvider>
      <Nav />
      <Main />
    </AlbumsContextProvider>
    </BrowserRouter>
  );
}

export default App;
