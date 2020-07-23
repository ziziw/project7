import React, {Component} from 'react';
import Photo from './Photo';
import NotFound from './NotFound';
import { withRouter } from 'react-router-dom';

class PhotoContainer extends Component {

  render(){
    const results = this.props.data;
    let photos = results.map(photo =>
      <Photo
        url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`}
        key={photo.id}
      />
    )

    return(
      <div className="photo-container">
        <h2>Results</h2>
        <ul>
          {photos}
        </ul>
        <NotFound />
      </div>
    )
  }
}

export default withRouter(PhotoContainer);
