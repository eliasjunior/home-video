// import React from 'react'
// import { Link } from "react-router-dom";
// import { get } from '../services/Api';

// class ListCourse extends React.Component {
//     state = {
//         list: [],
//         course: null
//     }
//     componentDidMount() {
//         get('courses')
//             .then(res => this.setState({ list: res }))
//             .catch(err => console.error(err))
//     }

//     loadCourse = (video) => {
//         get(`courses/${video}`)
//             .then(res => {
//                 this.setState({ 
//                     list: res, 
//                     course: video 
//                 })
//             })
//             .catch(err => console.error(err))
//     }

//     renderList() {
//         const { list, course } = this.state;
//         const getItems = () => {
//             if(course) {
//                 return list.map(file => {
//                     return   <li key={file}>
//                     <Link className="link-base link-btn" 
//                         to={`/movie/courses/${course}/${file}`}>
//                         {file}
//                     </Link>
//                 </li>
//                 })
//             } else {
//                 return list
//                 .map(movie => <li key={movie}>
//                     <button 
//                         className="link-base link-btn"
//                         onClick={() => this.loadCourse(movie)}>
//                         {movie}
//                     </button>
//                 </li>)
//             }
//         }
//         return (
//             <ul>{getItems()}</ul>
//         )
//     }

//     render() {
//         if(this.state.list.length === 0) {
//             return <div>Loading...</div>
//         }
//         return <div>
//                 {this.renderList()}
//                 <div>
//                    <Link className='link-base btn-back' to='/'>Back</Link>
//                 </div>
//             </div>
//     }
// }

// export default ListCourse;