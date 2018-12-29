import React from 'react'
import { Link } from "react-router-dom";
import constants from '../constants'
const { API_URL } = constants

class Movie extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loadedFailed: false
        }
        this.renderVideo = this.renderVideo.bind(this);
        this.onErrorHandle = this.onErrorHandle.bind(this);
    }
    onErrorHandle() {
        this.setState({ loadedFailed: true })
    }
    renderVideo() {
        const { location } = this.props;
        const { pathname } = location;
        //TODO: workaround for now
        const partial = pathname.slice(pathname.indexOf('movie/') + 'movie/'.length)

        if (this.state.loadedFailed) {
            return <div className='message-error'>Video Failed to load</div>
        } else {
            return <video
                onError={this.onErrorHandle}
                controls
                id="videoPlayer"
                width="620"
                autoPlay={true}
                height="400">
                <source src={API_URL + '/' + partial} type="video/mp4"></source>
            </video>
        }
    }
    render() {
        const { location } = this.props;
        const { pathname } = location;
        //TODO: another bad workaround, CHANGE HERE
        // or add test to future break
        const partial = pathname.slice(pathname.indexOf('movie/') + 'movie/'.length)

        let backRouter = '/movies';
        if(partial.indexOf('courses/') !== -1) {
            backRouter = '/courses';
        }
        return <div>
            {this.renderVideo()}
            <div>
                <Link className='link-base btn-back' to={backRouter}>Back</Link> 
            </div>
        </div>
    }
}

export default Movie