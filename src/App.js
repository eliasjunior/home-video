import React, { Component } from 'react';
import './App.css';
import ListMovie from './movie/ListMovie';
import Movie from './movie/Movie';
import Home from './Home';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

class App extends Component {
  state = {
    videoPath: null,
    baseFolder: null,
  }
  handleVideoPath = (videoPath) => {
    this.setState({ videoPath })
  }

  handleBaseFolder = (baseFolder) => {
    this.setState({ baseFolder })
  }

  render() {
    const { videoPath, baseFolder } = this.state;
    return (
      <div>
        {/*
          Sometimes you want to have a whitelist of static paths
          like "/about" and "/company" but also allow for dynamic
          patterns like "/:user". The problem is that "/about"
          is ambiguous and will match both "/about" and "/:user".
          Most routers have an algorithm to decide for you what
          it will match since they only allow you to match one
          "route". React Router lets you match in multiple places
          on purpose (sidebars, breadcrumbs, etc). So, when you
          want to clear up any ambiguous matching, and not match
          "/about" to "/:user", just wrap your <Route>s in a
          <Switch>. It will render the first one that matches.
      */}
      <BrowserRouter>
      
        <Switch>
          <Route
            exact path={`/`}
            render={props => {
              return <Home {...props}
                onHandleBaseFolder={this.handleBaseFolder}>
              </Home>
            }}>
          </Route>
          <Route
            path={`/display/:id`}
            render={props => <Movie
              {...props}
              videoPath={videoPath}>
            </Movie>}>
          </Route>
          <Route
            // need to be after /display because is dynamic and ambiguos
            path={`/:path`}
            render={props => {
              return <ListMovie {...props}
                baseFolder={baseFolder}
                onHandleVideoPath={this.handleVideoPath}>
              </ListMovie>
            }}>
          </Route>
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
