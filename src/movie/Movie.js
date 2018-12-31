import React from 'react';
import constants from '../constants';
import Footer from '../footer/Footer';
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
        
        if (this.state.loadedFailed) {
            return <div className='message-error'>Video Failed to load</div>
        } else {
            return <video
                onError={this.onErrorHandle}
                controls
                id="videoPlayer"
                width="100%"
                autoPlay={true}
                height="auto">
                <source src={API_URL + videoPath} type="video/mp4"></source>
            </video>
        }
    }
    render() {
        return <div>
            {this.renderVideo()}
            <Footer></Footer>
        </div>
    }
}


export default Movie