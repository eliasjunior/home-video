import React, { useState, useEffect } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "./App.css";
import ListMovie from "../components/movie/components/ListMovie";
import Player from "../components/movie/components/Player";
import Home from "../components/home/Home";
import { subscribeServerStatus } from "../common/Util";
import Footer from "../components/footer/Footer";

function App() {
  const [baseFolder, setBaseFolder] = useState("");
  const [serverStatus, setServerStatus] = useState("unknow");

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
            // need to be after /display because is dynamic and ambiguos
            path={`/:path`}
            render={(props) => {
              return (
                <ListMovie
                  {...props}
                  serverStatus={serverStatus}
                  baseFolder={baseFolder}
                ></ListMovie>
              );
            }}
          ></Route>
        </Switch>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}
export default App;
