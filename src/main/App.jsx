import VdMessage from "components/common/VdMessage";
import { useServerStatus } from "components/customHooks";
import React from "react";
import "./App.css";
import Routers from "./Routers";

function App() {
  const isOnline = useServerStatus();
  const displayContent = () => {
    if (!isOnline) {
      return <VdMessage text="server is unreachable"></VdMessage>;
    } else {
      return <Routers></Routers>;
    }
  };
  return <div className="app">{displayContent()}</div>;
}
export default App;
