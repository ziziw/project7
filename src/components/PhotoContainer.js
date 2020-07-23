import React, {Component} from 'react';
import Photo from './Photo';
import NotFound from './NotFound';
import { withRouter } from 'react-router-dom';

class PhotoContainer extends Component {

  render(){
    const results = this.props.data;
    let photos
    if (results.length > 0){
      photos = results.map(photo =>
        <Photo
          url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`}
          key={photo.id}
        />
      )
    } else {
      photos = <NotFound />
    }

    //Define the word used in the message.
    let word = 'Sunsets';
    let pathname = this.props.location.pathname;

    if (pathname !== '/'){
      if (pathname.includes('/search')){
        word = pathname.substring(8);
      } else {
        word = pathname.substring(1);
      }
    }

    //Display the message if there is at least 1 photo.
    let message = ''
    if (results.length > 0) {
      message = <h2>Images Of: {word}</h2>
    }

    return(
      <div className="photo-container">
        {message}
        {
          //display the loading message if the state loading is true.
          (this.props.loadingState)
            ? <p>Loading...</p>
            : <ul>{photos}</ul>
        }
      </div>
    )
  }
}

export default withRouter(PhotoContainer);
