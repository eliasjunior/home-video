import React, { Component } from 'react';
import './App.css';
import ListMovie from './movie/ListMovie';
import Movie from './movie/Movie';
import CourseList from './course/ListCourse';
import Home from './Home';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact path={`/`}
            component={Home}>
          </Route>
          <Route
            path={`/movies`}
            component={ListMovie}>
          </Route>
          <Route
            path={`/courses`}
            component={ListMovie}>
          </Route>
          <Route
            path={`/movie/:id`}
            component={Movie}>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
