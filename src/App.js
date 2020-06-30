import React from 'react';
import './App.css';
import SearchForm from './components/SearchForm'
import Nav from './components/Nav'
import PhotoContainer from './components/PhotoContainer'

import apiKey from './config'

const key = apiKey;

function App() {
  return (
    <div className="App">
      <SearchForm />
      <Nav />
      <PhotoContainer />
      {console.log(key)}
    </div>
  );
}

export default App;
