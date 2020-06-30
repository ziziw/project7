import React, {Component} from 'react';
import Photo from './Photo'
import NotFound from './NotFound'

class PhotoContainer extends Component {
  render(){
    return(
      <div className="photo-container">
        <h2>Results</h2>
        <Photo />
        <NotFound />
      </div>
    )
  }
}

export default PhotoContainer;
