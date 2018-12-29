import React from 'react'
import './movie.css'
import { Link } from "react-router-dom";
import { get } from '../services/Api';
import Footer from '../footer/Footer';
class ListMovie extends React.Component {
    state = {
        list: [],
        path: null
    }
    componentDidMount() {
        const options = {
            id: null,
            baseResource: getBaseResource(this.props)
        };

        getVideos.call(this, options);
    }
    renderLink(movie) {
        if (movie.indexOf('.mp4') !== -1) {
            return <Link
                className="link-base link-btn"
                to={`/movie/movies${this.state.path}/${movie}`}>
                {movie}
            </Link>
        } else {
            return <button
                className="link-base link-btn"
                onClick={() => getVideos.call(this, { 
                    id: movie, 
                    baseResource: getBaseResource(this.props) 
                })}>
                {movie}
            </button>
        }
    }
    renderList() {
        const { list } = this.state;
        const getItems = () => {
            return list
                .map(movie => <li key={movie}>
                    {this.renderLink(movie)}
                </li>)
        }
        return (
            <ul>{getItems()}</ul>
        )
    }

    render() {
        if (this.state.list.length === 0) {
            return <div>Loading...</div>
        }
        return <div>
            {this.renderList()}
            <Footer></Footer>
        </div>
    }
}

function getVideos({ id, baseResource }) {
    const resourse = id ? `${baseResource}/${id}` : baseResource;
    get(resourse)
        .then(res => this.setState({
            list: res.files,
            path: res.path
        }))
        .catch(err => console.error(err))
}

function getBaseResource({ match }) {
    return match.url.slice(1); //remove slash
}

export default ListMovie;