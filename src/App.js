import React, { Component } from 'react';
import './App.css';
import SearchForm from './components/SearchForm'
import Nav from './components/Nav'
import PhotoContainer from './components/PhotoContainer'
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import apiKey from './config'
const key = apiKey;

class App extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      sunsetsPhotos: [],
      waterfallsPhotos: [],
      mountainsPhotos: []
    }
  }

  componentDidMount(){
    this.requestAll()
  }

  componentDidUpdate(){
    this.performSearch()
  }

  requestAll = () => {
    Promise.all([
      fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=sunsets&per_page=24&format=json&nojsoncallback=1`)
        .then(response => response.json()),
      fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=waterfalls&per_page=24&format=json&nojsoncallback=1`)
        .then(response => response.json()),
      fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=mountains&per_page=24&format=json&nojsoncallback=1`)
        .then(response => response.json()),
    ])
    .then(allResponses => {
      this.setState({ sunsetsPhotos: allResponses[0].photos.photo })
      this.setState({ waterfallsPhotos: allResponses[1].photos.photo })
      this.setState({ mountainsPhotos: allResponses[2].photos.photo })
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error)
    })
  }

  performSearch = (query) => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then(resData => {
        this.setState({ photos: resData.photos.photo })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error)
      })
  }

  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <SearchForm onSearch={this.performSearch} history={this.props.history}/>
          <Nav />
          <Switch>
            <Route exact path='/' render={ () => <PhotoContainer data={this.state.sunsetsPhotos}/>}/>
            <Route path='/sunsets' render={ () => <PhotoContainer data={this.state.sunsetsPhotos}/>}/>
            <Route path='/waterfalls' render={ () => <PhotoContainer data={this.state.waterfallsPhotos}/>}/>
            <Route path='/mountains' render={ () => <PhotoContainer data={this.state.mountainsPhotos}/>}/>
          </Switch>
          <Route path='/search/:query' render={ () => <PhotoContainer data={this.state.photos}/>}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
