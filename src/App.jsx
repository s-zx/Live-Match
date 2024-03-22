import React, { useState } from "react";
import CompetitionFilter from "./components/CompetitionFilter.jsx";
import LiveMatches from "./components/LiveMatches.jsx";

const App = () => {
  const [selectedCompetition, setSelectedCompetition] = useState("");

  const handleCompetitionSelect = (competitionId) => {
    setSelectedCompetition(competitionId);
  };

  return (
    <div>
      <div className="top-0 left-0 mb-8 bg-[#6D0DB1] text-[#FFEC18]">
        <h1 className="pl-8 pt-4 pb-4 text-3xl">LIVE-SCORE</h1>
      </div>
      <div className="flex flex-row justify-evenly">
        <div className="">
          <CompetitionFilter onSelect={handleCompetitionSelect} />
        </div>
        <LiveMatches className="" competitionId={selectedCompetition} />
      </div>
    </div>
  );
};

export default App;
