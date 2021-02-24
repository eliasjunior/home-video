import React, { useState, useEffect } from "react";
import "./App.css";
import "../common/common.css";
import ListMovie from "../movie/ListMovie";
import Player from "../movie/Player";
import Home from "../home/Home";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { subscribeServerStatus } from "../common/Util";
import Footer from "../footer/Footer";

function App() {
  const [videoPath, setVideoPath] = useState("");
  const [baseFolder, setBaseFolder] = useState("");
  const [movie, setMovie] = useState({});
  const [serverStatus, setServerStatus] = useState("unknow");

  const handleVideoPath = (videoPath, movieParam) => {
    setVideoPath(videoPath);
    setMovie(movieParam);
  };
  const handleBaseFolder = (baseFolder) => {
    setBaseFolder(baseFolder);
  };
  const handleServerStatus = (value) => {
    setServerStatus(value);
  };

  useEffect(() => {
    subscribeServerStatus(handleServerStatus);
  }, [serverStatus]);

  return (
    <BrowserRouter>
      <div className="app">
        <div className="app-content">
          <Switch>
            <Route
              exact
              path={`/`}
              render={(props) => {
                return (
                  <Home {...props} onHandleBaseFolder={handleBaseFolder}></Home>
                );
              }}
            ></Route>
            <Route
              path={`/display/:id`}
              render={(props) => (
                <Player {...props} movie={movie} videoPath={videoPath}></Player>
              )}
            ></Route>
            <Route
              // need to be after /display because is dynamic and ambiguos
              path={`/:path`}
              render={(props) => {
                return (
                  <ListMovie
                    {...props}
                    serverStatus={serverStatus}
                    baseFolder={baseFolder}
                    onHandleVideoPath={handleVideoPath}
                  ></ListMovie>
                );
              }}
            ></Route>
          </Switch>
        </div>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}
export default App;
