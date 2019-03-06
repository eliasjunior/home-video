import React from 'react'
import './movie.css';
import { Link } from "react-router-dom";
import { get } from '../services/Api';
import Footer from '../footer/Footer';
import Movie from './Movie';

const VALID_FORMATS = new Map([
  ['mp4', 'mp4'],
  ['avi', 'avi'],
  ['mkv', 'mkv']
]);

class ListMovie extends React.Component {
  state = {
    folderOrFiles: [],
    folders: [],
    selectedFolder: null,
    baseFolder: null
  }
  componentDidMount() {
    const { baseFolder } = this.props;
    this.setState({ baseFolder })
    const options = {
      urlResource: getUrlResource(this.props),
      baseFolder
    };

    getVideos.call(this, options);
  }
  setUpMovie = (movie) => {
    const { folders } = this.state;
    console.log('shit', folders[movie])
    this.setState({
      folderOrFiles: folders[movie],
      selectedFolder: movie
    });
  }
  displayList() {
    const { folders } = this.state;

    const getItems = () => {
      return folders
        .map(movieFolder => <li key={movieFolder.id}>
          <Movie {...movieFolder}></Movie>
        </li>)
    }
    return (
      <ul>{getItems()}</ul>
    )
  }
  render() {
    const { folders } = this.state;
    if (!folders || folders.length === 0) {
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
      this.setState({
        folders: response,
      })
    })
    .catch(err => console.error(err))
}
function getUrlResource({ match }) {
  return match.url.slice(1); //remove slash
}

export default ListMovie;