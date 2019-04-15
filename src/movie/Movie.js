import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectMovieAction } from '../reducers/Movie';

function Image(src) {
  return <img src={src} alt='Movie'></img>
}

function movieImage(files = []) {
  const listImages = ['jpg', 'png', 'jpeg'];
  const temp = files
    .filter(file => listImages.some(ext => ext === file.slice(-3)) )
    .pop()
    
  const urlAddr = `movies/image/${temp}`
  console.log(`movies/image/${temp}`, temp) 

  return temp ? <img src={urlAddr} alt='Movie'></img> : ''
}

function Movie({name, files, id , setCurrentAction}) {
  const handleOnClick = () => {
    setCurrentAction({name, files, id})
  }
  
  return <div>
    {movieImage(files)}
    <Link
    className="link-base link-btn"
    to={`/display`}
    onClick={handleOnClick}>
    {name}
  </Link>
  </div>
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentAction: selectMovieAction(dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Movie);