// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import { getSeries } from "./Presenter";
// import VdMessage from "components/common/VdMessage";
// import Loading from "components/common/Loading";

// function Series() {
//   const [seriesId, setSeriesIds] = useState({});
//   const [showMap, setShowMap] = useState({});
//   const [errorMessage, setErrorMessage] = useState("");
//   async function fetchData() {
//     try {
//       const { allIds, byId, error } = await getSeries();
//       if (!error) {
//         // order matters https://reactjs.org/docs/hooks-rules.html
//         setShowMap(byId);
//         setSeriesIds(allIds);
//       } else {
//         setErrorMessage(error);
//       }
//     } catch (err) {
//       setErrorMessage("Error fetching the data");
//     }
//   }
//   useEffect(() => {
//     fetchData();
//   }, []);

//   if (errorMessage !== "") {
//     return <VdMessage text={errorMessage}></VdMessage>;
//   } else {
//     return seriesId.length === 0 ? (
//       <Loading></Loading>
//     ) : (
//       <div style={{ minHeight: "inherit" }}>
//         <div className="player-list"></div>
//       </div>
//     );
//   }
// }

// export default Series;
