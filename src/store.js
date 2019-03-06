import { createStore } from 'redux';
import Movie from './reducers/Movie';

export function getStore() {
  return createStore(
    Movie,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
}