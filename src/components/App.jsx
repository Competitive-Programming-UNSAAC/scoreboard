import React, { useState, useEffect } from "react";
import Scoreboard from "./scoreboard/Scoreboard";
import Spinner from "./spinner/Spinner";
import "./App.css";

const App = () => {
  // const [step, setStep] = useState("loading");
  const [contestData, setContestData] = useState({});

  return (
    <div className="AppBackground">
      {/* {step === "loading" && <Spinner />} */}
      {/* {step === "resolver" && <Scoreboard submissionsData={contestData} />} */}
      <Scoreboard />
    </div>
  );
};

export default App;
