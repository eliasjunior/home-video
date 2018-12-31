import React from 'react'
import './movie.css'
import { Link } from "react-router-dom";
import { get } from '../services/Api';
import Footer from '../footer/Footer';
class ListMovie extends React.Component {
    state = {
        folderOrFiles: [],
        folders: [],
        selectedFolder: null,
        baseFolder: null
    }
    componentDidMount() {
        const { baseFolder } = this.props;
        this.setState({baseFolder})
        const options = {
            urlResource: getUrlResource(this.props),
            baseFolder
        };

        getVideos.call(this, options);
    }
    diplayLink(movie) {
        const { folders, selectedFolder, baseFolder } = this.state;
        const { onHandleVideoPath } = this.props;
        //workaround for now baseFolder
        const videoPath = `/videos/${baseFolder}_${selectedFolder}/${movie}`;
        if (movie.includes('.mp4') !== -1) {
            return <Link
                className="link-base link-btn"
                to={`/display/${movie}`}
                onClick={() => onHandleVideoPath(videoPath)}>
                {movie}
            </Link>
        } else {
            return <button
                className="link-base link-btn"
                onClick={() => this.setState({
                    folderOrFiles: folders[movie],
                    selectedFolder: movie
                })}>
                {movie}
            </button>
        }
    }
    displayList() {
        const { folderOrFiles } = this.state;
        const getItems = () => {
            return folderOrFiles
                .map(name => <li key={name}>
                    {this.diplayLink(name)}
                </li>)
        }
        return (
            <ul>{getItems()}</ul>
        )
    }
    render() {
        if (this.state.folderOrFiles.length === 0) {
            return <div>Loading...</div>
        }
        return <div>
            {this.displayList()}
            <Footer></Footer>
        </div>
    }
}
function getVideos({ urlResource }) {
    get(urlResource)
        .then(response => {
            const folderOrFiles = Object.keys(response);
            this.setState({
                folders: response,
                folderOrFiles
            })
        })
        .catch(err => console.error(err))
}
function getUrlResource({ match }) {
    return match.url.slice(1); //remove slash
}

export default ListMovie;