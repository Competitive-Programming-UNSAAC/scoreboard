import React, { useState, useEffect } from "react";
import Scoreboard from "./scoreboard/Scoreboard";
import Spinner from "./spinner/Spinner";
import "./App.css";

const App = () => {

  const [step, setStep] = useState("loading");
  const [contestData, setContestData] = useState({});

  const fetchData = async () => {
    setStep("loading");
    try {
      // Fetch data from Parser API
      const response = await fetch("http://127.0.0.1:5000/data");
      const result = await response.json();
      setContestData(result);
      console.log("refresh");
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setStep("resolver");
    }
  };

  useEffect(() => {
    fetchData();
    
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="AppBackground">
      {step === "loading" && <Spinner />}
      {step === "resolver" && <Scoreboard submissionsData={contestData} />}
    </div>
  );
};

export default App;
