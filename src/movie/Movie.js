import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectMovieAction } from '../reducers/Movie';

function Movie({name, files, id , setCurrentAction}) {
  const handleOnClick = () => {
    setCurrentAction({name, files, id})
  }
  return <Link
    className="link-base link-btn"
    to={`/display`}
    onClick={handleOnClick}>
    {name}
  </Link>
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentAction: selectMovieAction(dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Movie);