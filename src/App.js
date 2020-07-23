import React, { Component } from 'react';
import './App.css';
import SearchForm from './components/SearchForm'
import Nav from './components/Nav'
import PhotoContainer from './components/PhotoContainer'
import Error from './components/Error'
import {
  Route,
  Switch,
  withRouter
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
      mountainsPhotos: [],
      searchTerm: '',
      loading: true
    }
  }

  componentDidMount(){
    this.requestAll()
  }

  componentDidUpdate(prevProps, prevState){
    let prevPathname = prevProps.location.pathname;
    let pathname = this.props.location.pathname;
    let searchTerm;

    if (pathname.includes('/search')){
      searchTerm = pathname.substring(8);
      if (prevPathname !== pathname){
        this.setState({ searchTerm: searchTerm});
        this.performSearch(searchTerm);
      }
    }
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
        this.setState({
          photos: resData.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error)
      }
    )
    this.setState({ loading: true })
  }

  render(){
    return (
      <div className="App">
        <SearchForm onSearch={this.performSearch}/>
        <Nav />
        <Switch>
          <Route exact path='/' render={ () => <PhotoContainer data={this.state.sunsetsPhotos} />}/>
          <Route path='/sunsets' render={ () => <PhotoContainer data={this.state.sunsetsPhotos} />}/>
          <Route path='/waterfalls' render={ () => <PhotoContainer data={this.state.waterfallsPhotos}/>}/>
          <Route path='/mountains' render={ () => <PhotoContainer data={this.state.mountainsPhotos} />}/>
          <Route path='/search/:query' render={ () => <PhotoContainer data={this.state.photos} onSearch={this.performSearch} loadingState={this.state.loading}/>}/>
          <Route component={Error}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
