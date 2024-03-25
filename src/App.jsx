import React, { useState } from "react";
import CompetitionFilter from "./components/CompetitionFilter.jsx";
import LiveMatches from "./components/LiveMatches.jsx";

const App = () => {
  const [selectedCompetition, setSelectedCompetition] = useState("");
  const [goalScored, setGoalScored] = useState(false);

  const handleCompetitionSelect = (competitionId) => {
    setSelectedCompetition(competitionId);
  };

  const handleGoalScored = () => {
    setGoalScored(true);
    setTimeout(() => {
      setGoalScored(false);
    }, 2000); // Reset the goal scored state after 2 seconds
  };

  return (
    <div>
      <div className="top-0 left-0 mb-8 bg-[#6D0DB1] text-[#FFEC18] flex flex-row">
        <h1 className="pl-8 pt-4 pb-4 text-3xl">LIVE-SCORE</h1>
        {goalScored && (
          <img
            src="src/assets/soccer-ball.png"
            alt="Goal"
            className="w-16 h-16 animate-goal"
          />
        )}
      </div>
      <div className="flex flex-row justify-evenly">
        <div className="">
          <CompetitionFilter onSelect={handleCompetitionSelect} />
        </div>
        <LiveMatches
          className=""
          competitionId={selectedCompetition}
          onGoalScored={handleGoalScored}
        />
      </div>
    </div>
  );
};

export default App;
