import React from 'react'
import './movie.css'
import { Link } from "react-router-dom";
import { get } from '../services/Api';

class ListMovie extends React.Component {
    state = {
        list: []
    }
    componentDidMount() {
        get(`list`)
            .then(res => {
                this.setState({ list: res })
            })
            .catch(err => console.error(err))
    }
    renderList() {
        const { list } = this.state;
        const getItems = () => {
            return list
                .map(movie => <li key={movie}>
                    <Link to={'/movie/list/'+movie}>{movie}</Link>
                </li>)
        }
        return (
            <ul>{getItems()}</ul>
        )
    }

    render() {
        if(this.state.list.length === 0) {
            return <div>Loading...</div>
        }
        return <div>
            {this.renderList()}
            <div className='btn-back'>
                <button><Link to='/'>Back</Link> </button>
            </div>
        </div>
    }
}

export default ListMovie;