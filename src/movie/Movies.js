import React from 'react'
import './movie.css';
import { get } from '../services/Api';
import Movie from './Movie';
class ListMovie extends React.Component {
  state = {
    folderOrFiles: [],
    movieList: [],
    selectedFolder: null,
    baseFolder: null
  }
  componentDidMount() {
    const { baseFolder, match } = this.props;
    this.setState({ baseFolder })
    //remove slash
    const urlResource = match.url.slice(1);

    get(urlResource)
      .then(response => {
        this.setState({
          movieList: response,
        })
      })
      .catch(err => console.error(err))
  }
  setUpMovie = (movie) => {
    const { movieList } = this.state;
    this.setState({
      folderOrFiles: movieList[movie],
      selectedFolder: movie
    });
  }
  displayList() {
    const { movieList } = this.state;

    const getItems = () => {
      return movieList
        .map(movieFolder => <li key={movieFolder.id}>
          <Movie {...movieFolder}></Movie>
        </li>)
    }
    return (
      <ul>{getItems()}</ul>
    )
  }
  render() {
    const { movieList } = this.state;
    if (!movieList || movieList.length === 0) {
      return <div>Loading...</div>
    } else {
      return <div>
        {this.displayList()}
      </div>
    }
  }
}

export default ListMovie;