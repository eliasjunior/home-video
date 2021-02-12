import React from 'react';
import {API_URL} from '../common/Constants';
import Footer from '../footer/Footer';
import './movie.css';

class Movie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadedFailed: false
    }
  }
  onErrorHandle = () => {
    this.setState({ loadedFailed: true })
  }
  renderVideo = () => {
    const { videoPath } = this.props;
    const getSubFromVideoUrl = () => {
      const removeSrtFromBegin = videoPath.slice(15); //videos/movies_, temporary
      return removeSrtFromBegin.slice(0, removeSrtFromBegin.length - 3) + 'vtt'
    }
    console.log('SUBTITLE --> ', getSubFromVideoUrl())
    const sub = videoPath && getSubFromVideoUrl();
    if (this.state.loadedFailed) {
      return <div>
        <div className='message-error'>Video Failed to load</div>
        <Footer></Footer>
      </div>
    } else {
      return (
        <video className="video-guy"
          onError={this.onErrorHandle} preload="metadata"
          controls
          id="videoPlayer"
          autoPlay={true}>
          <source src={API_URL + videoPath} type="video/mp4"></source>
          <track src={sub}
            label="English"
            kind="subtitles"
            srcLang="en" default>
          </track>
        </video>
      )
    }
  }
  render() {
    return <div>
      {this.renderVideo()}
    </div>
  }
}

export default Movie