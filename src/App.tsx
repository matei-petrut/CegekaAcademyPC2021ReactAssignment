import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Main from './components/Main/Main';
import { AlbumsContextProvider } from './contexts/AlbumsContext';
import { PhotosContextProvider } from './contexts/PhotosContext';

function App() {
  return (
    <BrowserRouter>
    <PhotosContextProvider>
      <AlbumsContextProvider>
        <Nav />
        <Main />
      </AlbumsContextProvider>
    </PhotosContextProvider>
    </BrowserRouter>
  );
}

export default App;
