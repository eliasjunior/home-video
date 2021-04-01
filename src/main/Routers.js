import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "./App.css";
import VideoMainList from "components/movie/components/VideoMainList";
import Player from "components/movie/components/Player";
import Home from "components/home/Home";

export default function Routers() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={`/`}
          render={(props) => {
            return <Home {...props}></Home>;
          }}
        ></Route>
        <Route
          path={`/display/:id/:type`}
          render={(props) => <Player {...props}></Player>}
        ></Route>
        <Route
          path={`/settings`}
          render={() => (
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
              }}
            >
              IN CONSTRUCTION
            </div>
          )}
        ></Route>
        <Route
          // need to be after /display because is dynamic and ambiguous
          path={`/:path`}
          render={(props) => {
            return <VideoMainList {...props}></VideoMainList>;
          }}
        ></Route>
      </Switch>
    </BrowserRouter>
  );
}
