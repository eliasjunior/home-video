import React from 'react';
import constants from '../constants';
import Footer from '../footer/Footer';
import './movie.css';
import { connect } from 'react-redux'; 

const { API_URL, STREAM } = constants;

class Stream extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadedFailed: false
    }
  }
  onErrorHandle = (e) => {
    console.error(e)
    this.setState({ loadedFailed: true })
  }
  renderVideo = () => {
    const { currentMovie } = this.props
    if (this.state.loadedFailed) {
      return <div>
        <div className='message-error'>Video Failed to load</div>
        <Footer></Footer>
      </div>
    } else {
      return <video className="video-guy"
        onError={this.onErrorHandle} preload="metadata"
        controls
        id="videoPlayer"
        autoPlay={true}>
        <source src={`${API_URL}/${STREAM}/${currentMovie.id}`} type="video/mp4"></source>
        {/* <track src={API_URL + sub} 
                    label="English" 
                    kind="subtitles" 
                    srcLang="en" default>
                </track> */}
      </video>
    }
  }
  render() {
    return <div>
      {this.renderVideo()}
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    currentMovie: state.currentMovie
  }
}
 export default connect(mapStateToProps)(Stream)