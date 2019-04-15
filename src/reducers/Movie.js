const SELETED_MOVIE = 'SELETED_MOVIE';

export const selectMovieAction = (dispatch) => {
  return ({name, files, id}) => {
    dispatch({
      type: SELETED_MOVIE,
      payload: { name, files, id }
    })
  }
}
export default function reducer(state = {}, action) {
  switch(action.type) {
    case SELETED_MOVIE :
      return Object.assign({}, state, {
        currentMovie: action.payload
      });
    default :
      return state;  
  }
}