import React from 'react';
import constants from '../constants';
import Footer from '../footer/Footer';
import './movie.css';

const { API_URL } = constants
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
        const sub = videoPath && videoPath.slice(0, videoPath.length - 3) + 'vtt'
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
                <source src={API_URL + videoPath} type="video/mp4"></source>
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


export default Movie